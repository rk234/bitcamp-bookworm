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
import EditorContextProvider from "@/providers/EditorContextProvider";
import { useParams } from "react-router";
import { collection, doc, getDoc, getDocs, onSnapshot, query, where } from "firebase/firestore";
import { db } from "@/config/firebase";
import { useEffect, useState } from "react";
import { getBoardIds } from "@/services/boardsService";

export default function EditorPage() {

  const { workspaceID, boardID } = useParams();

  const [workspaceDocID, setWorkspaceDocID] = useState<string>();
  const [boardDocID, setBoardDocID] = useState<string>();

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
    if (workspaceDocID && boardDocID) {
      const unsub = onSnapshot(doc(db, "workspaces", workspaceDocID, "boards", boardDocID), (snap) => {
        console.log(snap.data());
      })
      return () => {
        unsub();
      }
    }

  }, [boardDocID]);


  return (
    <>
      <EditorContextProvider>
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
            <CanvasContextProvider>
              <Canvas className="bg-background">
              </Canvas>
            </CanvasContextProvider>
          </SidebarInset>
        </SidebarProvider>
      </EditorContextProvider>
    </>
  );
}
