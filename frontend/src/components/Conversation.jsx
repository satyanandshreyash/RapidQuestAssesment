import { FaPlus } from "react-icons/fa6";
import { IoSend } from "react-icons/io5";
import ConversationHeader from "./ConversationHeader";
import ConversationHistory from "./ConversationHistory";
import { useRef } from "react";
import useActiveChatStore from "../store/activeChatStore";
import useMessageStore from "../store/messageStore";

const Conversation = () => {
  const inputRef = useRef(null);
  const { activeChat } = useActiveChatStore();
  const { addMessage, updateMessage } = useMessageStore();

  const handleSendMessage = async () => {
    const text = inputRef?.current?.value.trim();
    if (!text || !activeChat) return;
    const tempId = `local-${Date.now()}`;
    const newMessage = {
      id: tempId,
      name: activeChat.name,
      sender: "me",
      status: "sent",
      text: text,
      timestamp: new Date(),
      type: "text",
      wa_id: activeChat._id,
    };
    addMessage(newMessage);
    try {
      const res = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/sendMessage/${activeChat._id}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ text, name: activeChat.name }),
        }
      );
      if (!res.ok) throw new Error("Failed to send message");
      const savedMessage = await res.json();
      updateMessage(tempId, { id: savedMessage.id, status: "sent" });
    } catch (error) {
      console.error("Error sending message:", error.message);
      updateMessage(tempId, { status: "failed" });
    } finally {
      inputRef.current.value = "";
    }
  };
  return (
    <div className="bg-[hsl(0,0%,11%)] h-screen w-full flex flex-col justify-between">
      <ConversationHeader />
      <ConversationHistory />
      <div className="bg-[hsl(0,0%,16%)] flex gap-1 items-center rounded-full px-4 mx-4 my-4">
        <FaPlus className="font-light" />
        <input
          type="text"
          ref={inputRef}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSendMessage();
            }
          }}
          className="rounded-full w-full bg-[hsl(0,0%,16%)] outline-none px-4 py-2 text-lg"
          placeholder={`Type a message`}
        />
        <IoSend
          className="text-xl font-semibold cursor-pointer"
          onClick={handleSendMessage}
        />
      </div>
    </div>
  );
};

export default Conversation;
