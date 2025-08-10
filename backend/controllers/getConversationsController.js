import { Message } from "../models/message.model.js";

export const getConversationsController = async (req, res) => {
    try {
        const conversations = await Message.aggregate([
            { $sort: { timestamp: -1 } },
            {
                $group: {
                    _id: "$wa_id",
                    name: { $first: "$name" },
                    lastMessage: { $first: "$text" },
                    lastTimestamp: { $first: "$timestamp" },
                    status: { $first: "$status" },
                }
            },
            { $sort: { lastTimestamp: -1 } },
        ]);
        return res.status(200).json({ conversations });
    } catch (error) {
        console.error("Error fetching conversations:", error.message);
        return res.status(500).json({ message: "Internal server error" });
    }
}