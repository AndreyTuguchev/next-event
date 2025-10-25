import { EventFormValues } from "../../event-form.types";

/**
 * Normalizes event form data before submission
 * Handles price calculations and free ticket logic
 */
const normalizeEventData = (
  values: EventFormValues,
  imageUrl: string,
): EventFormValues => {
  const normalized = { ...values, imageUrl };

  // Handle free ticket logic
  if (normalized.isFree) {
    normalized.price = "0";
  }

  // Ensure price is a valid integer string
  const priceNumber = parseInt(normalized.price, 10);

  if (isNaN(priceNumber) || priceNumber < 0) {
    normalized.price = "0";
  } else {
    normalized.price = priceNumber.toString();
  }

  // If price is 0, mark as free
  if (normalized.price === "0") {
    normalized.isFree = true;
  }

  return normalized;
};

export default normalizeEventData;
