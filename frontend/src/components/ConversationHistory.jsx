import useMessageStore from "../store/messageStore";
import { format } from "date-fns";
import { BsCheck, BsCheckAll } from "react-icons/bs";

const ConversationHistory = () => {
  const { messages } = useMessageStore();
  return (
    <div className="h-full p-4 flex flex-col gap-4">
      {messages.map((message) => {
        const isMe = message.sender === "me";

        return (
          <div
            key={message._id}
            className={`flex ${isMe ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`px-3 py-2 max-w-sm md:max-w-lg rounded-lg ${
                isMe
                  ? "bg-green-800 rounded-tr-none"
                  : "bg-[hsl(0,0%,20%)] rounded-tl-none"
              }`}
            >
              {message.text}
              <div className="flex items-center justify-end gap-1 mt-1 text-xs opacity-70">
                <span>{format(new Date(message.timestamp), "HH:mm")}</span>
                {message.sender === "me" && (
                  <>
                    {message.status === "pending" && (
                      <span title="Sending…">⏳</span>
                    )}
                    {message.status === "sent" && (
                      <BsCheck title="Sent" className="text-white" size={16} />
                    )}
                    {message.status === "delivered" && (
                      <BsCheckAll
                        title="Delivered"
                        className="text-white"
                        size={16}
                      />
                    )}
                    {message.status === "read" && (
                      <BsCheckAll
                        title="Read"
                        className="text-blue-400"
                        size={16}
                      />
                    )}
                    {message.status === "failed" && (
                      <span title="Failed" className="text-red-400">
                        ❌
                      </span>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ConversationHistory;
