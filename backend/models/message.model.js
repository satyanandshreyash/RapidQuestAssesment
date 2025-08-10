import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
    id: { type: String, required: true, unique: true },
    wa_id: String, // phone number of sender
    name: String, // sender's name
    text: String,
    type: String,
    timestamp: Date,
    status: String,
    sender: { type: String, enum: ["me", "them"], required: true }, // "me" for sent messages, "them" for received messages
})

export const Message = mongoose.model("ProcessedMessage", messageSchema);