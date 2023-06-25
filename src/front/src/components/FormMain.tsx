import React, { useState, FormEvent } from "react";
import { FileUploader } from "react-drag-drop-files";
import {socket} from "../socket/SocketConfig";

const FormMain = (data: {
  backendUrl: string | undefined;
  setFileGen: React.Dispatch<React.SetStateAction<null>>;
  setShowInputFiles: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const fileTypes = ["JPG", "PNG", "JPEG"];
  const [file, setFile] = useState([]);

  const handleChange = (file: any) => {
    setFile(file);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData();
    if (file) {
      for (let i = 0; i < file["length"]; i++) {
        formData.append("files", file[i]);
      }
    }

    data.setShowInputFiles(true);
    socket.emit('generateResponse');

    fetch(`${data.backendUrl}/api/convert`, {
      method: "POST",
      credentials: "include",
      body: formData,
      headers: {},
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        data.setFileGen(data.filename);
      });
  };

  return (
    <>
    <p className="subtitle-conversor">
        {" "}
        Convierte tus archivos jpg a respuestas en txt
      </p>
      <header className="App-header "></header>
    <form onSubmit={handleSubmit} className="file-form">
      <div className="form-container">
        <FileUploader
          multiple={true}
          name="file"
          types={fileTypes}
          handleChange={handleChange}
        >
          <div className="form-text">
            Haz click o arrastra aqui los archivos
          </div>
        </FileUploader>
      </div>
      <div className="uploaded-container">
        {file && file.length !== 0 ? (
          <>
            <div className="subtitle-files">Archivos subidos:</div>
            {Array.apply(0, Array(file["length"])).map((value, index) => {
              return (
                <>
                  <div key={index}>
                    <p>Nombre: {file[index]["name"]}</p>
                  </div>
                </>
              );
            })}
          </>
        ) : (
          <p>No se han subido archivos</p>
        )}
      </div>
      <div className="button-submit">
        <button type="submit" className="submit-button">
          Generar respuestas
        </button>
      </div>
    </form>
    </>
  );
};

export default FormMain;
