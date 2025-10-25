import { IEvent } from "@/lib/database/models/event.model";

export type EventCardProps = {
  event: IEvent;
  hasOrderLink?: boolean;
  hidePrice: boolean;
  loggedInUserId: string;
  isWebsiteAdmin?: boolean;
};
