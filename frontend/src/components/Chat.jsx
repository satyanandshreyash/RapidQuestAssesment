import React from "react";
import useActiveChatStore from "../store/activeChatStore";
import useMessageStore from "../store/messageStore";
import { getInitials } from "../utils/getInitials";

const Chat = ({ chat }) => {
  const { activeChat, setActiveChat } = useActiveChatStore();
  const { setMessages } = useMessageStore();

  const handleClick = async () => {
    setActiveChat(chat);
    const res = await fetch(
      `${import.meta.env.VITE_BACKEND_URL}/api/getMessages/${chat._id}`
    );
    const data = await res.json();
    setMessages(data.messages);
  };

  return (
    <div
      className={`flex items-center gap-4 hover:bg-[hsl(0,0%,14%)] p-1 md:p-2 rounded-xl cursor-pointer ${
        activeChat?._id === chat._id ? "bg-[hsl(0,0%,14%)]" : ""
      }`}
      onClick={handleClick}
    >
      <div className="flex items-center justify-center rounded-full bg-[hsl(0,0%,20%)] w-14 h-14 font-semibold text-xl shrink-0">
        {getInitials(chat.name)}
      </div>
      <div className="flex flex-col gap-1">
        <h1 className="font-semibold">{chat.name}</h1>
        <h2 className="text-sm  text-[hsl(0,0%,70%)] font-normal truncate max-w-[120px]">
          {/* {chat.lastMessage.slice(0, 80)}{" "}
          {chat.lastMessage.length > 80 ? "..." : ""} */}
          {chat.lastMessage}
        </h2>
      </div>
    </div>
  );
};

export default Chat;
