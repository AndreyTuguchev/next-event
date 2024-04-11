"use server"

import { ApproveEventParams, CreateEventParams, DeleteEventParams, GetAllEventsParams, GetRelatedEventsByCategoryParams, UpdateEventParams } from "@/types"
import { handleError } from "../utils";
import { connectToDatabase } from "../database";
import User from "../database/models/user.model";
import Event from "../database/models/event.model";
import Category from "../database/models/category.model";
import { revalidatePath } from "next/cache";

const populateEvent = async ( query: any ) => {
    return query
        .populate({ path: 'organizer', model: User, select: '_id firstName lastName' })
        .populate({ path: 'category', model: Category, select: '_id name' })
}

export const createEvent = async ({ event, userId, path } : CreateEventParams ) => {

    try {
        await connectToDatabase();

        const organizer = await User.findById(userId);

        if ( !organizer ) {
            throw new Error('organizer not found');
        }

        const newEvent = await Event.create({ ...event, category: event.categoryId, organizer: userId });


        return JSON.parse( JSON.stringify(newEvent));

    }catch (error) {
        handleError(error);
    }

}


export const getEventById = async ( eventId: string ) => {

    try {
        await connectToDatabase();

        const event = await populateEvent(Event.findById(eventId));

        if ( !event ){
            throw new Error(' getEventById() Event not found ');
        }

        return JSON.parse( JSON.stringify(event));

    }catch(error){
         handleError(error)
    }
}

export const getAllEvents = async ( { query, limit = 8, page, category } : GetAllEventsParams ) => {

    try {
        await connectToDatabase();

        const conditions = {$or: [
            {
                isApproved: true,
            }
        ]}

        const eventsQuery = Event.find( conditions )
            .sort({ createdAt: 'desc'})
            .skip(0)
            .limit(limit);

        const events = await populateEvent(eventsQuery);

        const eventsCount = await Event.countDocuments(conditions)

        return {
            data: JSON.parse( JSON.stringify(events) ),
            totalPages: Math.ceil( eventsCount/limit ),
        };

    }catch(error){
         handleError(error)
    }
}



export const deleteEvent = async ( { eventId, path } : DeleteEventParams ) => {

    try {
        await connectToDatabase();

        const deletedEvent = await Event.findByIdAndDelete(eventId);

        if ( deletedEvent ) {
            revalidatePath(path);
            revalidatePath( path === "/events" ? "/" : "/events" )
        }

    }catch(error){
         handleError(error)
    }
}


export const approveEventById = async ( {event }: ApproveEventParams ) => {

    try {
        await connectToDatabase();

        const updatedEvent = await Event.findByIdAndUpdate(
            event._id,
            { ...event, isApproved: true },
            { new: false });


        if ( !updatedEvent ){
            throw new Error(' approveEventById() updatedEvent not found ');
        }

        
        revalidatePath("/")
        revalidatePath("/events")

        return JSON.parse( JSON.stringify(event));

    }catch(error){
         handleError(error)
    }
}


export async function updateEvent({ userId, event, path }: UpdateEventParams) {
    try {
      await connectToDatabase()
  
    const eventToUpdate = await Event.findById(event._id)

      if (!eventToUpdate || eventToUpdate.organizer.toHexString() !== userId) {
        throw new Error('Unauthorized or event not found')
      }
  
      const updatedEvent = await Event.findByIdAndUpdate(
        event._id,
        { ...event, category: event.categoryId },
        { new: true }
      )
      revalidatePath(path)

      return JSON.parse(JSON.stringify(updatedEvent))
    } catch (error) {
      handleError(error)
    }
  }

  
  export async function getRelatedEventsByCategory({
    categoryId,
    eventId,
    limit = 3,
    page = 1,
  }: GetRelatedEventsByCategoryParams) {
    try {
      await connectToDatabase()
  
      const skipAmount = (Number(page) - 1) * limit
      const conditions = { $and: [{ category: categoryId }, { _id: { $ne: eventId } }] }
  
      const eventsQuery = Event.find(conditions)
        .sort({ createdAt: 'desc' })
        .skip(skipAmount)
        .limit(limit)
  
      const events = await populateEvent(eventsQuery)
      const eventsCount = await Event.countDocuments(conditions)
  
      return { data: JSON.parse(JSON.stringify(events)), totalPages: Math.ceil(eventsCount / limit) }
    } catch (error) {
      handleError(error)
    }
  }