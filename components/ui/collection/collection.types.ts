import { IEvent } from "@/lib/database/models/event.model";

export type CollectionProps = {
  data: IEvent[];
  emptyTitle: string;
  emptyStateSubtext: string;
  collectionType?: "Events_Organized" | "My_Tickets" | "All_Events";
  page: number | string;
  totalPages?: number;
  urlParamName?: string;
  loggedInUserId: string;
  isWebsiteAdmin?: boolean;
};
