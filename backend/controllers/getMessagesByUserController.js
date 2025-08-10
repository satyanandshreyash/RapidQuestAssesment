import { Message } from "../models/message.model.js";

export const getMessagesByUserController = async (req, res) => {
    try {
        const { wa_id } = req.params;
        if (!wa_id) {
            return res.status(400).json({ message: "wa_id is required" });
        }
        const messages = await Message.find({ wa_id }).sort({ timestamp: 1 });
        res.status(200).json({ messages });
    } catch (error) {
        console.error("Error fetching messages:", error.message);
        res.status(500).json({ message: "Internal server error" });
    }
}