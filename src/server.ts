import express, { json } from "express";
import cookieSession from "cookie-session";
import multer from "multer";
import { generateReport, downloadFile } from "./controller/report";
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config({ path: 'config.env' });
const PORT = process.env.PORT || 3000;

const uplaod = multer({
  dest: "temp",
});

const app = express();


const corsOptions ={
  origin: 'http://localhost:3000',
  methods: ['POST', 'GET', 'PUT', 'OPTIONS', 'HEAD', 'DELETE'],
  credentials: true,
}
app.use(cors(corsOptions));

app.use(
  cookieSession({
    httpOnly: true,

    name: "session",
    secret: "dKQ2xT38XR%Z",
  })
);
app.use(json());

app.post(
  "/api/convert",
  uplaod.array("files"),
  generateReport
);
app.get("/api/download/:file", downloadFile);

app.use('/', express.static('front'))

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});