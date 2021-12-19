import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import http from "http";
import cors from "cors";
import { Server } from "socket.io";

import router from "./controlle.js";

const app = express();
const server = http.createServer(app);

app.use(bodyParser.json());

mongoose
  .connect("mongodb://localhost:27017/realtime")
  .then(() => console.log("Connected to the database"))
  .catch((err) => console.log(err));

const PORT = 5000 | process.env.PORT;

app.use(router);

// app.get('/', (req,res) =>{
//   res.send("Hello world");
// })

const io = new Server(server, {
  transports: ["polling"],
  cors: {
    cors: {
      origin: "http://localhost:3000",
    },
  },
});

io.on("connection", (socket) => {
  console.log("A user is connected");

  socket.on("message", (message) => {
    console.log(`message from ${socket.id} : ${message}`);
  });

  socket.on("disconnect", () => {
    console.log(`socket ${socket.id} disconnected`);
  });
});

export { io };

server.listen(PORT, () => console.log("Server is up"));
