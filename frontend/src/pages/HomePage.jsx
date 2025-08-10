import SideBar from "../components/SideBar";
import NoChatSelected from "../components/NoChatSelected";
import Conversation from "../components/Conversation";
import useActiveChatStore from "../store/activeChatStore";

const HomePage = () => {
  const { activeChat, setActiveChat } = useActiveChatStore();
  return (
    <div className="h-screen text-[hsl(0,0%,90%)] flex">
      {/* Sidebar */}
      <div
        className={`h-full border-r border-[hsl(0,0%,20%)]
          ${activeChat ? "hidden md:block md:w-1/3" : "w-full md:w-1/3"}
        `}
      >
        <SideBar />
      </div>

      {/* Conversation */}
      <div
        className={`h-full flex-1
          ${!activeChat ? "hidden md:flex" : "flex"}
        `}
      >
        {activeChat ? <Conversation /> : <NoChatSelected />}
      </div>
    </div>
  );
};

export default HomePage;
