import React, { useState, useEffect, FormEvent, useContext } from "react";
import { FileUploader } from "react-drag-drop-files";

import "./styles/app.css";
function App() {
  const backendUrl = process.env.REACT_APP_API_URL;
  const fileTypes = ["JPG", "PNG", "JPEG"];
  const [file, setFile] = useState([]);
  const [fileXlsx, setFileXlsx] = useState(null);

  const handleChange = (file: any) => {
    setFile(file);
    setFileXlsx(null);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData();
    if (file) {
      for (let i = 0; i < file["length"]; i++) {
        formData.append("files", file[i]);
      }
    }

    fetch(`${backendUrl}/api/convert`, {
      method: "POST",
      credentials: "include",
      body: formData,
      headers: {},
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setFileXlsx(data.filename);
      });
  };

  const downloadResponse = () => {
    const url = `${backendUrl}/api/download/${fileXlsx}`;
    window.open(url);
  };

  return (
    <div className="App dropdown-box">
      <p className="title-conversor">
        Contestador de imagenes
      </p>
      <p className="subtitle-conversor"> Convierte tus archivos jpg a respuestas en txt</p>
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
      {fileXlsx  ? (
        <div className="download-button-div">
          <button className="download-button" onClick={downloadResponse}>
            Descargar
          </button>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}

export default App;
