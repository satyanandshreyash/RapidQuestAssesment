import React from "react";

const NoChatSelected = () => {
  return (
    <div className="bg-[hsl(0,0%,11%)] h-screen w-full flex flex-col items-center justify-center gap-2">
      <h1 className="text-4xl font-semibold">WhatsApp Web</h1>
      <p className="text-[hsl(0,0%,50%)]">
        Send & receive messages. Select a chat to start messaging.
      </p>
    </div>
  );
};

export default NoChatSelected;
