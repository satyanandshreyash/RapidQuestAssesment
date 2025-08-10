import { Router } from "express";
import { payloadProcessorController } from "../controllers/payloadProcessorController.js";
import { getConversationsController } from "../controllers/getConversationsController.js";
import { getMessagesByUserController } from "../controllers/getMessagesByUserController.js";
import { sendMessageController } from "../controllers/sendMessageController.js";
const router = Router();

router.post("/process-payload", payloadProcessorController);
router.get("/getConversations", getConversationsController);
router.get("/getMessages/:wa_id", getMessagesByUserController);
router.post("/sendMessage/:wa_id", sendMessageController);

export default router;