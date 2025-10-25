import Image from "next/image";
import {
  FormField,
  FormItem,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import type { Control } from "react-hook-form";
import { EventFormValues } from "../../event-form.types";

interface PricingSectionProps {
  control: Control<EventFormValues>;
}

const PricingSection = ({ control }: PricingSectionProps) => {
  return (
    <div className="flex flex-col gap-5 md:flex-row">
      <FormField
        control={control}
        name="price"
        render={({ field }) => (
          <FormItem className="w-full">
            <FormControl>
              <div className="flex items-center h-[54px] w-full overflow-hidden rounded-full bg-grey-50 px-4 py-2">
                <Image
                  width={24}
                  height={24}
                  src="/assets/icons/dollar.svg"
                  alt=""
                  aria-hidden="true"
                  className="filter-grey"
                />
                <Input
                  type="number"
                  placeholder="Price"
                  {...field}
                  className="p-regular-16 border-0 bg-grey-50 outline-offset-0 focus:border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                  aria-label="Event price"
                  min="0"
                />
                <FormField
                  control={control}
                  name="isFree"
                  render={({ field: checkboxField }) => (
                    <FormItem>
                      <FormControl>
                        <div className="flex items-center">
                          <label
                            htmlFor="isFree"
                            className="whitespace-nowrap pr-3 leading-none cursor-pointer"
                          >
                            Free Ticket
                          </label>
                          <Checkbox
                            id="isFree"
                            onCheckedChange={checkboxField.onChange}
                            checked={checkboxField.value}
                            className="mr-2 h-5 w-5 border-2 border-primary-500"
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="url"
        render={({ field }) => (
          <FormItem className="w-full">
            <FormControl>
              <div className="flex items-center h-[54px] w-full overflow-hidden rounded-full bg-grey-50 px-4 py-2">
                <Image
                  width={24}
                  height={24}
                  src="/assets/icons/link.svg"
                  alt=""
                  aria-hidden="true"
                />
                <Input
                  placeholder="URL"
                  {...field}
                  className="input-field"
                  type="url"
                  aria-label="Event URL"
                />
              </div>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};

export default PricingSection;
