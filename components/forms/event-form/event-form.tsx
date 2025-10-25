// EventForm/index.tsx
"use client";

import { useCallback } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import * as z from "zod";

import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";

import { eventFormSchema } from "@/lib/validator";
import { eventDefaultValues } from "@/constants";
import { createEvent, updateEvent } from "@/lib/actions/event.action";
import type { IEvent } from "@/lib/database/models/event.model";

import AdminSection from "./sections/admin-section";
import InfoSection from "./sections/info-section";
import DetailsSection from "./sections/details-section";
import LocationSection from "./sections/location-section";
import DateTimeSection from "./sections/date-time-section";
import PricingSection from "./sections/pricing-section";

import { useFileUpload } from "@/hooks/use-file-upload";
import handleEventSubmission from "./utils/handle-event-submission";
import { useToast } from "@/hooks/use-toast";
import normalizeEventData from "./utils/normalize-event-data";
import { EventFormProps } from "./event-form.types";

const EventForm = ({
  userId,
  userRole,
  type,
  event,
  eventId,
  isWebsiteAdmin = false,
}: EventFormProps) => {
  const router = useRouter();
  const { toast } = useToast();
  const { files, setFiles, uploadFiles, isUploading } = useFileUpload();

  const initialValues = getInitialValues(event, type);

  const form = useForm<z.infer<typeof eventFormSchema>>({
    resolver: zodResolver(eventFormSchema),
    defaultValues: initialValues,
  });

  const onSubmit = useCallback(
    async (values: z.infer<typeof eventFormSchema>) => {
      try {
        // Upload files if present
        const uploadedImageUrl = await uploadFiles(files, values.imageUrl);

        // Normalize form data
        const normalizedData = normalizeEventData(values, uploadedImageUrl);

        // Handle submission based on type
        const result = await handleEventSubmission({
          type,
          data: normalizedData,
          userId,
          eventId,
          isWebsiteAdmin,
          createEvent,
          updateEvent,
        });

        if (result.success) {
          form.reset();
          toast({
            title: "Success",
            description: `Event ${type === "Create" ? "created" : "updated"} successfully`,
          });
          router.push(`/events/${result.eventId}`);
        } else {
          toast({
            title: "Error",
            description: result.error || "Failed to submit event",
            variant: "destructive",
          });
        }
      } catch (error) {
        toast({
          title: "Error",
          description:
            error instanceof Error
              ? error.message
              : "An unexpected error occurred",
          variant: "destructive",
        });
      }
    },
    [
      files,
      uploadFiles,
      type,
      userId,
      eventId,
      isWebsiteAdmin,
      form,
      toast,
      router,
    ]
  );

  const isSubmitting = form.formState.isSubmitting || isUploading;

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-5 mb-[200px] pt-[30px]"
        aria-label={`${type} event form`}
      >
        {isWebsiteAdmin && <AdminSection control={form.control} />}

        <InfoSection control={form.control} userRole={userRole} />

        <DetailsSection control={form.control} setFiles={setFiles} />

        <LocationSection control={form.control} />

        <DateTimeSection control={form.control} />

        <PricingSection control={form.control} />

        <Button
          type="submit"
          size="lg"
          disabled={isSubmitting}
          className="col-span-2 w-full button"
          aria-busy={isSubmitting}
        >
          {isSubmitting ? "Submitting Event..." : `${type} Event`}
        </Button>
      </form>
    </Form>
  );
};

// Helper function
function getInitialValues(event: IEvent | undefined, type: string) {
  if (event && type === "Update") {
    return {
      ...event,
      startDateTime: new Date(event.startDateTime),
      endDateTime: new Date(event.endDateTime),
    };
  }
  return eventDefaultValues;
}

export default EventForm;
