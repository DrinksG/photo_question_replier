import React, { useState, useEffect } from "react";
import FormMain from "./components/FormMain";
import {socket,runSocket} from "./socket/SocketConfig";
import {ResponseInterface} from "./interfaces/ResponseInterface";

import "./styles/app.css";
import ResponsePage from "./components/ResponsePage";
function MainPage() {
  const backendUrl = process.env.REACT_APP_API_URL;
  const [fileGen, setFileGen] = useState(null);
  const [showInputFiles, setShowInputFiles] = useState(false);
  const [response, setResponse] = useState(null);

  const downloadResponse = () => {
    const url = `${backendUrl}/api/download/${fileGen}`;
    window.open(url);
  };

  useEffect(() => {
    if(showInputFiles) {
      runSocket();
      socket.on("generateResponse", (response) => {
        setResponse(response);
      });
      return () => {
          socket.removeAllListeners();
      }
    }
  }, [showInputFiles]);
  
  return (
    <div className="App dropdown-box">
      <p className="title-conversor">Contestador de imagenes</p>
      {showInputFiles ? 
        <FormMain setFileGen={setFileGen} backendUrl={backendUrl} setShowInputFiles={setShowInputFiles}/>
        : 
        <ResponsePage/>
      }

      {fileGen ? (
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

export default MainPage;
