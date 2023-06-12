import { Response, Request } from "express";
import {Tesseract} from "tesseract.ts";
import fs from "fs";
import { createTxtFromData } from "../util/file";
import {rewriteText,answerQuestion} from '../util/chatgpt';

export interface ImageData {
  data: string;
}

export interface ExerciseData {
  question: string;
  response: string;
}

export const generateReport = async (req: Request, res: Response) => {
  let files = (Array.isArray(req.files) ? req.files : [req.files]) as Express.Multer.File[];

  
  let filePaths = [];
  for (let file of files) {
    filePaths.push(file.path);
  }

  let imgDataArrPromise = [];
  for (let filePath of filePaths) {
    imgDataArrPromise.push(readDataFromImage(filePath));
  }

  const dataImg = await Promise.all(imgDataArrPromise);
  let imgDataQuestionArr = [];
  for(let imgData of dataImg){
    if (imgData !== "") {
      imgDataQuestionArr.push(rewriteText(imgData.text));
    }
  }

  const dataRewritte = await Promise.all(imgDataQuestionArr);
  let dataResArrQuestion = [];
  for(let data of dataRewritte){
    dataResArrQuestion.push(answerQuestion(data));
  }

  const dataRes = await Promise.all(dataResArrQuestion);
  const dataResArr:ExerciseData[] = [];
  let cont = 0;
  for(let question of dataRewritte){
    dataResArr.push({ question: question, response: dataRes[cont] });
    cont++;
  }

  const filePath = await createTxtFromData(dataResArr);
  res.status(200).send({ filename: filePath });

  setTimeout(() => {
    fs.unlink(`temp/${filePath}`, (err) => {
      if (err) console.log(err);
    });
  }, 1000 * 60 * 30)

  for (let file of files) {
    fs.unlink(file.path, (err) => {
      if (err) console.log(err);
    });
  }
}

const readDataFromImage = async (imagePath: string) => {
  try {
    // Realizar el reconocimiento utilizando la ruta del archivo
    return Tesseract.recognize(imagePath);
  } catch (error) {
    console.error(error);
    return ""; // Opcionalmente, puedes manejar el error de otra manera o lanzar una excepción.
  }
};

export const downloadFile = (req: Request, res: Response) => {
  const fileName = req.params["file"];
  const filePath = `temp/${fileName}`;
  res.download(filePath, (err) => {
    if (err) console.log(err);    
  });
};
