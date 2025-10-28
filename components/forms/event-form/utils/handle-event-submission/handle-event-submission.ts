import { SubmissionResult } from '../../event-form.types';
import handleEventResult from '../handle-event-result';
import { SubmissionTypes } from './handle-event-submission.types';

/**
 * Handles event creation or update
 * Returns a standardized result object
 */
const handleEventSubmission = async ({
  type,
  data,
  userId,
  eventId,
  isWebsiteAdmin,
  createEvent,
  updateEvent,
}: SubmissionTypes): Promise<SubmissionResult> => {
  try {
    if (type === 'Create') {
      const result = await createEvent({
        event: data,
        userId,
        path: '/profile',
      });

      return handleEventResult(result);
    }

    if (type === 'Update') {
      if (!eventId) {
        return {
          success: false,
          error: 'Event ID is required for updates',
        };
      }

      const result = await updateEvent({
        userId,
        event: { ...data, _id: eventId },
        path: `/events/${eventId}`,
        isWebsiteAdmin,
      });

      return handleEventResult(result);
    }

    return {
      success: false,
      error: 'Invalid submission type',
    };
  } catch (error) {
    return {
      success: false,
      error:
        error instanceof Error ? error.message : 'An unexpected error occurred',
    };
  }
};

export default handleEventSubmission;
