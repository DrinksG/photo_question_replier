import fs from "fs";
import {ExerciseData} from "../controller/report";

export const createTxtFromData = async (filesData: ExerciseData[]) => {
  try {
    const joinedData = filesData.map(({ question,response }) => `QUESTION:${question}\n\nRESPONSE:\n${response}`).join("\n\n\n\n\n\n");

    const milis = Date.now();
    const generatedFilePath = `temp/${milis}.txt`;

    await fs.promises.writeFile(generatedFilePath, joinedData, "utf-8");
    return milis + ".txt";
  } catch (error) {
    console.error("Error al crear el archivo preguntas.txt:", error);
  }
};