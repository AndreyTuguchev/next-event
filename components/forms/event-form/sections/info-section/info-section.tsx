import {
  FormField,
  FormItem,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Dropdown from "@/components/ui/dropdown";
import type { Control } from "react-hook-form";
import { EventFormValues } from "../../event-form.types";

interface BasicInfoSectionProps {
  control: Control<EventFormValues>;
  userRole: string;
}

const BasicInfoSection = ({ control, userRole }: BasicInfoSectionProps) => {
  return (
    <div className="flex flex-col gap-5 md:flex-row">
      <FormField
        control={control}
        name="title"
        render={({ field }) => (
          <FormItem className="w-full">
            <FormControl>
              <Input
                placeholder="Event Title"
                {...field}
                className="input-field"
                aria-label="Event title"
                required
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="categoryId"
        render={({ field }) => (
          <FormItem className="w-full">
            <FormControl>
              <Dropdown
                onChangeHandler={field.onChange}
                value={field.value}
                userRole={userRole}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};

export default BasicInfoSection;
