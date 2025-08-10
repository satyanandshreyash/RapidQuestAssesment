import { ImSearch } from "react-icons/im";
import { SlOptionsVertical } from "react-icons/sl";
import useActiveChatStore from "../store/activeChatStore";
import { getInitials } from "../utils/getInitials";
import { IoArrowBack } from "react-icons/io5";

const ConversationHeader = () => {
  const { activeChat, setActiveChat } = useActiveChatStore();
  return (
    <div className="flex items-center justify-between bg-[hsl(0,0%,9%)] p-4">
      <div className="flex gap-2 md:gap-4 items-center">
        <button
          className="md:hidden text-2xl"
          onClick={() => setActiveChat(null)}
        >
          <IoArrowBack />
        </button>
        <div className="flex items-center justify-center rounded-full bg-[hsl(0,0%,20%)] w-12 h-12 font-semibold text-xl">
          {getInitials(activeChat.name)}
        </div>
        <div className="flex flex-col gap-1">
          <h1 className="font-semibold">{activeChat.name}</h1>
        </div>
      </div>

      <div className="flex gap-8 items-center pr-4">
        <ImSearch className="text-xl font-semibold" />
        <SlOptionsVertical className="text-xl font-semibold" />
      </div>
    </div>
  );
};

export default ConversationHeader;
