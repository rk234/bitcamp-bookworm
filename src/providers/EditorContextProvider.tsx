import { EditorContext } from "@/contexts/editorContext";
import { ReactNode, useState } from "react";

export default function EditorContextProvider({ children }: { children: ReactNode }) {


  return <EditorContext.Provider value={{
  }}>
    {children}
  </EditorContext.Provider>
}
