import { Router } from "express";
import multer from "multer";
import { generateReport, downloadFile } from "../controller/report";

const router = Router();
const uplaod = multer({
  dest: "temp",
});

router.post("/api/convert", uplaod.array("files"), generateReport);
router.get("/api/download/:file", downloadFile);

export { router as PhotoQuestionRepleirRouter };
