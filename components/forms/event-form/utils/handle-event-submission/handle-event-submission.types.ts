import { EventFormValues } from '../../event-form.types';

export type SubmissionTypes = {
  type: 'Create' | 'Update';
  data: EventFormValues;
  userId: string;
  eventId?: string;
  isWebsiteAdmin: boolean;
  createEvent: Function;
  updateEvent: Function;
};
