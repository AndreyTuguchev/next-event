import { SubmissionResult } from "../../event-form.types";

/**
 * Processes the result from event creation/update
 * Handles legacy string-based error responses
 */

// TODO: replace ANY with actual type
const handleEventResult = (result: any): SubmissionResult => {
  // Handle null/undefined
  if (!result) {
    return {
      success: false,
      error: "No response from server",
    };
  }

  // Handle string-based error responses (legacy)
  if (typeof result === "string") {
    if (result.startsWith("Error") || result.startsWith("Alert")) {
      return {
        success: false,
        error: result,
      };
    }
  }

  // Handle error objects
  if (result.error) {
    return {
      success: false,
      error: result.error,
    };
  }

  // Success case
  if (result._id) {
    return {
      success: true,
      eventId: result._id,
    };
  }

  return {
    success: false,
    error: "Invalid response format",
  };
};

export default handleEventResult;
