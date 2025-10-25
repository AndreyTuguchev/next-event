import { Dispatch, SetStateAction } from "react";
import type { Control } from "react-hook-form";
import { EventFormValues } from "../../event-form.types";

export type DetailsSectionTypes = {
  control: Control<EventFormValues>;
  setFiles: Dispatch<SetStateAction<File[]>>;
};
