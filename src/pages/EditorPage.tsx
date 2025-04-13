import { EditorSidebar } from "@/components/EditorSidebar";
import Canvas from "@/components/Canvas";
import CanvasContextProvider from "@/providers/CanvasContextProvider";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Separator } from "@radix-ui/react-dropdown-menu";
import { useParams } from "react-router";
import { collection, doc, getDoc, getDocs, onSnapshot, query, updateDoc, where } from "firebase/firestore";
import { db } from "@/config/firebase";
import { useEffect, useState } from "react";
import { getBoardIds } from "@/services/boardsService";
import { Board, BoardBlock } from "@/types/workspace";
import { EditorContext } from "@/contexts/editorContext";

export default function EditorPage() {

  const { workspaceID, boardID } = useParams();


  let [workspaceDocID, setWorkspaceDocID] = useState<string>();
  let [boardDocID, setBoardDocID] = useState<string>();

  let [board, setBoard] = useState<Board>();

  let onBlocksUpdate = async (blocks: BoardBlock[]) => {
    if(!workspaceDocID || !boardDocID || !blocks || !board) {
      return;
    }
    let ref = doc(db, "workspaces", workspaceDocID, "boards", boardDocID);
    let newBoard: Board = {...board, blocks};
    console.log(newBoard);
    await updateDoc(ref, newBoard);
  } 
  
  useEffect(() => {
    if (workspaceID && boardID) {
      getBoardIds(workspaceID, boardID).then(({ workspaceDocID, boardDocID }) => {
        setWorkspaceDocID(workspaceDocID);
        setBoardDocID(boardDocID);
        return;
      });
    }
  }, [boardID]);

  useEffect(() => {
    if(workspaceDocID && boardDocID) {
      let unsub = onSnapshot(doc(db, "workspaces", workspaceDocID, "boards", boardDocID), (snap) => {
        let res = snap.data() as Board;
        console.log(res);
        setBoard(res);
      })
      return () => {
        unsub();
      }
    }

  }, [boardDocID]);


  return (
    <>
      <EditorContext.Provider value={{
        board, setBoard
      }}>
        <SidebarProvider>
          <EditorSidebar />
          <SidebarInset>
            <header className="flex h-14 shrink-0 items-center gap-2">
              <div className="flex flex-1 items-center gap-2 px-3">
                <SidebarTrigger />
                <Separator className="mr-2 h-4" />
                <Breadcrumb>
                  <BreadcrumbList>
                    <BreadcrumbItem>
                      <BreadcrumbPage className="line-clamp-1">
                        Workspace Name Goes Here
                      </BreadcrumbPage>
                    </BreadcrumbItem>
                  </BreadcrumbList>
                </Breadcrumb>
              </div>
            </header>
            <CanvasContextProvider blocksUpdate={onBlocksUpdate}>
              <Canvas>
              </Canvas>
            </CanvasContextProvider>
          </SidebarInset>
        </SidebarProvider>
      </EditorContext.Provider>
    </>
  );
}
