'use server';

import { revalidatePath } from 'next/cache';

import {
  ApproveEventParams,
  CreateEventParams,
  DeleteEventParams,
  GetAllEventsParams,
  GetEventsByUserParams,
  GetRelatedEventsByCategoryParams,
  UpdateEventParams,
} from '@/types';

import { connectToDatabase } from '../database';
import Category from '../database/models/category.model';
import Event from '../database/models/event.model';
import User from '../database/models/user.model';
import { handleError } from '../utils';
import { updateUser } from './user.actions';

const populateEvent = async (query: any) => {
  return query
    .populate({
      path: 'organizer',
      model: User,
      select: '_id firstName lastName',
    })
    .populate({ path: 'category', model: Category, select: '_id name' });
};

const getCategoryByName = async (name: string) => {
  return Category.findOne({ name: { $regex: name, $options: 'i' } });
};

export const createEvent = async ({
  event,
  userId,
  path,
  isWebsiteAdmin = false,
}: CreateEventParams) => {
  try {
    await connectToDatabase();

    const organizer = await User.findById(userId);

    if (!organizer) {
      throw new Error('organizer not found');
    }

    if (organizer.eventsCreatedAmount === organizer.maxEventsAllowed) {
      return "Error! You've reached the maximum number of events allowed for your account.";
    }

    if ('super_admin' !== organizer.userRole && organizer.eventsPending >= 2) {
      return 'Error! You cannot have more than two events pending. Please wait for approval...';
    }

    const currentTime = Date.now();

    const newEvent = await Event.create({
      ...event,
      category: event.categoryId,
      organizer: userId,
      createdAt: currentTime,
    });

    organizer.eventsPending += 1;
    organizer.eventsCreatedAmount += 1;

    '' == organizer.listOfEventsCreatedTime
      ? (organizer.listOfEventsCreatedTime += currentTime.toString())
      : (organizer.listOfEventsCreatedTime += ';' + currentTime.toString());

    const updatedUser = await updateUser(organizer.clerkId, organizer);

    revalidatePath('/events/create');
    revalidatePath('/admin');

    return JSON.parse(JSON.stringify(newEvent));
  } catch (error) {
    handleError(error);
  }
};

export const getEventById = async (eventId: string) => {
  try {
    await connectToDatabase();

    const event = await populateEvent(Event.findById(eventId));

    if (!event) {
      throw new Error(' getEventById() Event not found ');
    }

    return JSON.parse(JSON.stringify(event));
  } catch (error) {
    handleError(error);
  }
};

export async function getAllEvents({
  query,
  limit = 9,
  page,
  category,
  isWebsiteAdmin = false,
}: GetAllEventsParams) {
  try {
    await connectToDatabase();

    const titleCondition = query
      ? { title: { $regex: query, $options: 'i' } }
      : {};
    const categoryCondition = category
      ? await getCategoryByName(category)
      : null;

    const conditions = isWebsiteAdmin
      ? {
          $and: [
            titleCondition,
            categoryCondition ? { category: categoryCondition._id } : {},
          ],
        }
      : {
          $and: [
            { isApproved: true },
            titleCondition,
            categoryCondition ? { category: categoryCondition._id } : {},
          ],
        };

    const skipAmount = (Number(page) - 1) * limit;
    const eventsQuery = Event.find(conditions)
      .sort({ startDateTime: 'asc' })
      .skip(skipAmount)
      .limit(limit);

    const events = await populateEvent(eventsQuery);
    const eventsCount = await Event.countDocuments(conditions);

    return {
      data: JSON.parse(JSON.stringify(events)),
      totalPages: Math.ceil(eventsCount / limit),
    };
  } catch (error) {
    handleError(error);
  }
}

export const deleteEvent = async ({ eventId, path }: DeleteEventParams) => {
  try {
    await connectToDatabase();

    const deletedEvent = await Event.findByIdAndDelete(eventId).populate({
      path: 'organizer',
    });

    if (deletedEvent) {
      if (false === deletedEvent.isApproved) {
        deletedEvent.organizer.eventsPending -= 1;
      }

      deletedEvent.organizer.eventsCreatedAmount -= 1;

      if (deletedEvent.createdAt > 1710107350) {
        deletedEvent.organizer.listOfEventsCreatedTime =
          deletedEvent.organizer.listOfEventsCreatedTime
            .split(deletedEvent.createdAt)
            .join('')
            .replace(';;', ';');

        if (';' === deletedEvent.organizer.listOfEventsCreatedTime) {
          deletedEvent.organizer.listOfEventsCreatedTime = '';
        }

        if (';' === deletedEvent.organizer.listOfEventsCreatedTime[0]) {
          deletedEvent.organizer.listOfEventsCreatedTime =
            deletedEvent.organizer.listOfEventsCreatedTime.substr(1);
        }

        if (
          ';' ===
          deletedEvent.organizer.listOfEventsCreatedTime[
            deletedEvent.organizer.listOfEventsCreatedTime.length - 1
          ]
        ) {
          deletedEvent.organizer.listOfEventsCreatedTime =
            deletedEvent.organizer.listOfEventsCreatedTime.substr(
              0,
              deletedEvent.organizer.listOfEventsCreatedTime.length - 1
            );
        }
      }

      const updatedUser = await updateUser(deletedEvent.organizer.clerkId, {
        ...deletedEvent.organizer,
      });

      revalidatePath(path);
      revalidatePath(path === '/events' ? '/' : '/events');
      revalidatePath('/events/create');
      revalidatePath('/admin');
    }
  } catch (error) {
    handleError(error);
  }
};

export const approveEventById = async ({ event }: ApproveEventParams) => {
  try {
    await connectToDatabase();

    const updatedEvent = await Event.findByIdAndUpdate(
      event._id,
      { ...event, isApproved: true },
      { new: false }
    );

    if (!updatedEvent) {
      throw new Error(' approveEventById() updatedEvent not found ');
    }

    revalidatePath('/');
    revalidatePath('/events');
    revalidatePath('/admin');

    return JSON.parse(JSON.stringify(event));
  } catch (error) {
    handleError(error);
  }
};

export async function updateEvent({
  userId,
  event,
  path,
  isWebsiteAdmin = false,
}: UpdateEventParams) {
  try {
    await connectToDatabase();

    const eventToUpdate = await Event.findById(event._id);

    if (
      !isWebsiteAdmin &&
      (!eventToUpdate || eventToUpdate.organizer.toHexString() !== userId)
    ) {
      throw new Error('Unauthorized or event not found');
    }

    const updatedEvent = await Event.findByIdAndUpdate(
      event._id,
      { ...event, category: event.categoryId },
      { new: true }
    );
    revalidatePath(path);

    return JSON.parse(JSON.stringify(updatedEvent));
  } catch (error) {
    handleError(error);
  }
}

export async function getRelatedEventsByCategory({
  categoryId,
  eventId,
  limit = 3,
  page = 1,
}: GetRelatedEventsByCategoryParams) {
  try {
    await connectToDatabase();

    const skipAmount = (Number(page) - 1) * limit;
    const conditions = {
      $and: [
        { category: categoryId },
        { _id: { $ne: eventId } },
        { isApproved: true },
      ],
    };

    const eventsQuery = Event.find(conditions)
      .sort({ createdAt: 'desc' })
      .skip(skipAmount)
      .limit(limit);

    const events = await populateEvent(eventsQuery);
    const eventsCount = await Event.countDocuments(conditions);

    return {
      data: JSON.parse(JSON.stringify(events)),
      totalPages: Math.ceil(eventsCount / limit),
    };
  } catch (error) {
    handleError(error);
  }
}

export async function getEventsByUser({
  userId,
  limit = 9,
  page,
}: GetEventsByUserParams) {
  try {
    await connectToDatabase();

    const conditions = { organizer: userId };
    const skipAmount = (page - 1) * limit;

    const eventsQuery = Event.find(conditions)
      .sort({ createdAt: 'desc' })
      .skip(skipAmount)
      .limit(limit);

    const events = await populateEvent(eventsQuery);
    const eventsCount = await Event.countDocuments(conditions);

    return {
      data: JSON.parse(JSON.stringify(events)),
      totalPages: Math.ceil(eventsCount / limit),
    };
  } catch (error) {
    handleError(error);
  }
}
