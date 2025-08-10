import React from "react";
import { IoIosSearch } from "react-icons/io";
import Chat from "./Chat";
import { useEffect } from "react";
import { useState } from "react";

const SideBar = () => {
  const [chats, setChats] = useState([]);
  useEffect(() => {
    const fetchChats = async () => {
      const chats = await getChats();
      setChats(chats.conversations);
    };
    fetchChats();
  }, []);
  return (
    <div className="bg-[hsl(0,0%,10%)] h-screen p-4 md:p-6 flex flex-col gap-4 border-r border-[hsl(0,0%,20%)]">
      <h1 className="font-bold text-2xl">WhatsApp</h1>
      <div className="bg-[hsl(0,0%,20%)] flex gap-1 items-center rounded-full px-4">
        <IoIosSearch className="text-xl" />
        <input
          type="text"
          className="rounded-full w-full bg-[hsl(0,0%,20%)] outline-none px-4 py-2"
          placeholder={`Search or start new chat`}
        />
      </div>
      <div className="flex flex-col gap-2">
        {chats.map((chat) => (
          <Chat key={chat._id} chat={chat} />
        ))}
      </div>
    </div>
  );
};

const getChats = async () => {
  const response = await fetch("http://localhost:3000/api/getConversations");
  const data = await response.json();
  return data;
};

export default SideBar;
