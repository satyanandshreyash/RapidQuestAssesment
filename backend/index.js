import dotenv from "dotenv";
dotenv.config();
import express from "express";
import { createServer } from 'node:http';
import { Server } from "socket.io";
import cors from "cors";
import { connectDB } from "./utils/database.js";
import chatRouter from "./routes/chatRouter.js";

const app = express();
const server = createServer(app);
const io = new Server(server, {
    cors: {
        origin: '*',
        methods: ["GET", "POST"],
    }
})

await connectDB();

app.use(cors());
app.use(express.json());

app.use('/api', chatRouter);

app.get("/", (req, res) => {
    res.send("Hello World");
})

io.on("connection", (socket) => {
    console.log("A user connected", socket.id);
    socket.on("disconnect", () => {
        console.log("user disconnected", socket.id);
    });
})

server.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
})