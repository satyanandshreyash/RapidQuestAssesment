// script to process and populate database with sample payloads
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import { Message } from './models/message.model.js';
import { connectDB } from './utils/database.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const payloadsDir = path.join(__dirname, 'whatsapp sample payloads');

await connectDB();

await processSamplePayloads();
process.exit(0);

async function processSamplePayloads() {
    const files = await fs.readdir(payloadsDir);
    for (const file of files) {
        const content = await fs.readFile(path.join(payloadsDir, file), 'utf-8');
        const payload = JSON.parse(content);
        const value = payload?.metaData?.entry[0]?.changes[0]?.value;
        const display_phone_number = value?.metadata?.display_phone_number;
        let messageData = {};
        if (value.messages) {
            const msg = value.messages[0];
            messageData = {
                id: msg.id,
                wa_id: value.contacts[0].wa_id,
                name: value.contacts[0].profile.name,
                text: msg.text.body,
                type: msg.type,
                timestamp: new Date(Number(msg.timestamp) * 1000),
                status: "pending",
                sender: msg.from === display_phone_number ? "me" : "them",
            };
            try {
                await Message.updateOne(
                    { id: msg.id },
                    { $setOnInsert: messageData },
                    { upsert: true }
                );
                console.log(`Inserted: ${msg.id}`);
            } catch (error) {
                console.log(`Error inserting ${msg.id}`, error.message);
            }
        }
        if (value.statuses) {
            const sts = value.statuses[0];
            const msgId = sts.id || sts.meta_msg_id;
            try {
                await Message.updateOne(
                    { id: msgId },
                    { $set: { status: sts.status } }
                );
                console.log(`Updated status for ${msgId} to ${sts.status}`);
            } catch (error) {
                console.log(`Error updating status for ${msgId}`, error);
            }
        }
    }
    console.log("All payloads processesd");
}
