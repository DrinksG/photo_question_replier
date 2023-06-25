import React, { PropsWithChildren, useState, Dispatch } from "react";

interface SessionProps {
  socketId: string;
  setSocketId?: Dispatch<string>;
}

// Context lets us pass a value deep into the component tree
// without explicitly threading it through every component.
// Create a context for the current session
export const SessionContext = React.createContext<SessionProps>({socketId:""});


export default function Session({ children }: PropsWithChildren) {
  const [socketId, setSocketId] = useState("");

  return (
    <SessionContext.Provider value={{ socketId, setSocketId }}>
      {children}
    </SessionContext.Provider>
  );
}