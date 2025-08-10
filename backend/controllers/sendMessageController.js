import { Message } from "../models/message.model.js";

export const sendMessageController = async (req, res) => {
    try {
        const { wa_id } = req.params;
        const { text, name } = req.body;
        if (!text || !name) {
            return res.status(400).json({ error: "Message text is required" });
        }
        const messageId = `local-${Date.now()}`;
        const messageData = {
            id: messageId,
            wa_id,
            name,
            type: "text",
            text,
            timestamp: new Date(),
            status: "pending",
            sender: "me"
        }
        const savedMessage = await Message.create(messageData);
        res.status(201).json({
            message: "Message sent successfully",
            data: savedMessage
        })
    } catch (error) {
        console.error("Error sending message:", error.message);
        res.status(500).json({ error: "Error sending message" });
    }
}