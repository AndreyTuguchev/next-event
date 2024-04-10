"use server"

import { CreateEventParams } from "@/types"
import { handleError } from "../utils";
import { connectToDatabase } from "../database";
import User from "../database/models/user.model";
import Event from "../database/models/event.model";
import Category from "../database/models/category.model";

const populateEvent = async ( query: any ) => {
    return query
        .populate({ path: 'orginizer', model: User, select: '_id firstName lastName' })
        .populate({ path: 'category', model: Category, select: '_id name' })
}

export const createEvent = async ({ event, userId, path } : CreateEventParams ) => {

    try {
        await connectToDatabase();

        const orginizer = await User.findById(userId);

        if ( !orginizer ) {
            throw new Error('Orginizer not found');
        }

        const newEvent = await Event.create({ ...event, category: event.categoryId, orginizer: userId });

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