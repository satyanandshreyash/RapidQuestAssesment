import { useEffect } from "react";
import socket from "./socket";
import HomePage from "./pages/HomePage";

function App() {
  useEffect(() => {
    socket.on("connect", () => {
      console.log("User connected", socket.id);
    });

    socket.on("disconnect", () => {
      console.log("User disconnected", socket.id);
    });
  }, []);
  return (
    <div className="h-screen w-full">
      <HomePage />
    </div>
  );
}

export default App;
