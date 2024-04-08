import { Schema, model, models } from "mongoose";

/**
 * listOfEventsCreatedTime and listOfBlockedTime are a strings with Unix timestamps separated by ";"
 * We need this to track how often this user is blocked and how often this create an event.
 * listOfEventsCreatedTime will track only last 5-7 events created and if the time between creation time is too short then this is probably bot or someone with malicious intent who's trying to overload our server.
 * 
*/
const UserSchema = new Schema({
    clerkId: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true},
    username: { type: String, required: true, unique: true},
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    photo: { type: String, required: true },
    
    maxEventsAllowed : { type: Number, default: 25 },
    eventsCreatedAmount : { type: Number, default: 0 },
    listOfEventsCreatedTime : { type: String, default: "" },
    blockedUser : { type: Boolean,  default: false },
    amountOfBlockedActions : { type: Number,  default: 0 },
    listOfBlockedTime : { type: String,  default: "" },
    userRole: { type: String, default: "user" },
    
})

const User = models.User || model('User', UserSchema);

export default User;