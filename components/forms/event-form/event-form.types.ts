import type { z } from "zod";
import type { eventFormSchema } from "@/lib/validator";
import { IEvent } from "@/lib/database/models/event.model";

export type EventFormValues = z.infer<typeof eventFormSchema>;

export type SubmissionResult = {
  success: boolean;
  eventId?: string;
  error?: string;
};

export type EventFormProps = {
  userId: string;
  userRole: string;
  type: "Create" | "Update";
  event?: IEvent;
  eventId?: string;
  isWebsiteAdmin?: boolean;
};
