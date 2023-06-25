import express, { json } from "express";

import dotenv from "dotenv";
import http from "http";
import { Server } from "socket.io";
import cors from "cors";
import mongoose from "mongoose";
import { PhotoQuestionRepleirRouter } from "./router/PhotoQuestionRepleirRouter";
import { NotFoundError } from "./errors/NotFoundError";
import morgan from 'morgan';
import { errorHandler} from './middlewares/ErrorHandler';
import MenuSocket from "./sockets/MenuSocket";

dotenv.config({ path: "config.env" });
const PORT = process.env.PORT || 3000;

const app = express();
app.use(cors());

const httpServer = http.createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "*",
  },
});

//MONGOO
if (!process.env.DATABASE_URI) {
  process.exit();
}
mongoose.connect(process.env.DATABASE_URI).then(() => {
  console.log("DB connection successfull");
});
app.use(json());
app.use(PhotoQuestionRepleirRouter);
app.all('*', async (req, res) => {
  throw new NotFoundError();
});

app.use("/", express.static("front"));

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
if (process.env.NODE_ENV === 'dev') {
  app.use(morgan('dev'));
}
app.use(errorHandler);

//SOCKET
io.on('connect',(socket)=>{
  MenuSocket(socket,io);
});


httpServer.listen(process.env.PORT,()=>{
  console.log("Test pipeline")
  console.log("Listen on "+process.env.PORT );
});