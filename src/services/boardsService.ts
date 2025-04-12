import { db } from "@/config/firebase";
import { collection, query, where, getDocs } from "firebase/firestore";

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
