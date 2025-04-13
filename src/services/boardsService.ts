import { db } from "@/config/firebase";
import { Board } from "@/types/workspace";
import { collection, query, where, getDocs, DocumentReference, QueryDocumentSnapshot, DocumentData } from "firebase/firestore";

export const getBoardIds = async (workspaceID: string, boardID: string) => {
  // Step 1: Query for user doc
  const workspaceRef = collection(db, "workspaces");
  const workspaceQuery = query(workspaceRef, where("id", "==", workspaceID));
  const workspaceSnapshot = await getDocs(workspaceQuery);
  if (workspaceSnapshot.empty) throw new Error("Workspace not found");

  const workspaceDocID = workspaceSnapshot.docs[0].id;

  // Step 2: Query for post doc
  const boardRef = collection(db, "workspaces", workspaceDocID, "boards");
  const boardQuery = query(boardRef, where("id", "==", boardID));
  const boardSnapshot = await getDocs(boardQuery);
  if (boardSnapshot.empty) throw new Error("Board not found");

  const boardDocID = boardSnapshot.docs[0].id;

  return { workspaceDocID, boardDocID };
};

export const getAllWorkspaceBoardDocs = async (workspaceID: string) => {
  const workspaceRef = collection(db, "workspaces");
  const workspaceQuery = query(workspaceRef, where("id", "==", workspaceID));
  const workspaceSnapshot = await getDocs(workspaceQuery);
  if (workspaceSnapshot.empty) throw new Error("Workspace not found");

  const workspaceDocID = workspaceSnapshot.docs[0].id;

  const boardsRef = collection(db, "workspaces", workspaceDocID, "boards");
  const boardsQuery = query(boardsRef);
  const boardsSnapshot = await getDocs(boardsQuery);
  return boardsSnapshot.docs;
}

export const getAllBoardsInWorkspace = async (workspaceID: string) => {
  let boardDocs: QueryDocumentSnapshot<DocumentData, DocumentData>[] = 
    await getAllWorkspaceBoardDocs(workspaceID);
    
  return boardDocs.map((doc)=> doc.data() as Board)
}


export const getAllWorkspaceText = async (workspaceID: string) => {
  
  let boards = await getAllWorkspaceBoardDocs(workspaceID);
  let out = boards.map((doc) => {
    let board = doc.data() as Board;
    console.log(board)
    let out = `BOARD NAME: ${board.name}\n`

    board.blocks.forEach(block => {
      if(block.type == "markdown") {
        out += block.markdown+"\n"
      }
    });
    out += "==================="
    return out
  }).join("\n");
  return out;
}
