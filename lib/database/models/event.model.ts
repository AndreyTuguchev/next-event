import { Document, Schema, model, models } from "mongoose";

export interface IEvent extends Document {
    _id: string;
    title: string;
    description?: string;
    location?: string;
    createdAt: Date;
    imageUrl: string;
    startDateTime: Date;
    endDateTime: Date;
    price?: string;
    isFree: boolean;
    isApproved: boolean;
    url: string;
    category : { _id: string; name: string };
    orginizer : { _id: string; firstName: string; lastName: string };
}

const EventSchema = new Schema({
    title: { type: String, required: true },
    description: { type: String },
    location: { type: String },
    createdAt: { type: Date, default: Date.now() },
    imageUrl: { type: String, required: true },
    startDateTime: { type: Date, default: Date.now() },
    endDateTime: { type: Date, default: Date.now() },
    price: { type: String, required: true },
    isFree: { type: Boolean, default: false },
    isApproved: { type: Boolean, default: false },
    url: { type: String },
    category : { type: Schema.Types.ObjectId, ref: 'Category' },
    orginizer : { type: Schema.Types.ObjectId, ref: 'User' },
});

const Event = models.Event || model( 'Event', EventSchema );

export default Event;