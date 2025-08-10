import { Message } from "../models/message.model.js";

export const payloadProcessorController = async (req, res) => {
    try {
        const payload = req.body;
        const value = payload?.metaData?.entry[0]?.changes[0]?.value;
        const display_phone_number = value?.metadata?.display_phone_number;
        if (!value) {
            return res.status(400).json({ message: "Invalid payload format" });
        }
        if (value.messages) {
            const msg = value.messages[0];
            const messageData = {
                id: msg.id,
                wa_id: value.contacts[0].wa_id,
                name: value.contacts[0].profile.name,
                text: msg.text.body,
                type: msg.type,
                status: "pending",
                timestamp: new Date(Number(msg.timestamp) * 1000),
                sender: msg.from === display_phone_number ? "me" : "them",
            };
            await Message.updateOne(
                { id: msg.id },
                { $setOnInsert: messageData },
                { upsert: true }
            )
            console.log(`Message inserted: ${msg.id}`);
        }
        if (value.statuses) {
            const sts = value.statuses[0];
            const msgId = sts.id || sts.meta_msg_id;
            await Message.updateOne(
                { id: msgId },
                { $set: { status: sts.status } }
            )
            console.log(`Status updated for ${msgId} to ${sts.status}`);
        }
        return res.status(200).json({ message: "Payload processed successfully" });
    } catch (error) {
        console.error("Error processing payload:", error.message);
        return res.status(500).json({ message: "Internal server error" });
    }
}
