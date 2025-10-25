import { toast as sonnerToast } from "sonner";
import { ToastProps } from "./use-toast.types";

export function useToast() {
  const toast = ({ title, description, variant }: ToastProps) => {
    if (variant === "destructive") {
      sonnerToast.error(title, { description });
    } else {
      sonnerToast.success(title, { description });
    }
  };

  return { toast };
}
