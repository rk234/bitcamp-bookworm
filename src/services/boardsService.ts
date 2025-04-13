import { db } from "@/config/firebase";
import { Board } from "@/types/workspace";
import { collection, query, where, getDocs, collection, doc, setDoc, getDoc } from "firebase/firestore";
import { v4 } from "uuid";

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

export const getAllWorkspaceText = async (workspaceID: string) => {
  const workspaceRef = collection(db, "workspaces");
  const workspaceQuery = query(workspaceRef, where("id", "==", workspaceID));
  const workspaceSnapshot = await getDocs(workspaceQuery);
  if (workspaceSnapshot.empty) throw new Error("Workspace not found");

  const workspaceDocID = workspaceSnapshot.docs[0].id;

  const boardsRef = collection(db, "workspaces", workspaceDocID, "boards");
  const boardsQuery = query(boardsRef);
  const boardsSnapshot = await getDocs(boardsQuery);
  console.log(boardsSnapshot)

  const out = boardsSnapshot.docs.map((doc) => {
    const board = doc.data() as Board;
    console.log(board)
    let out = `BOARD NAME: ${board.name}\n`

    board.blocks.forEach(block => {
      if (block.type == "markdown") {
        out += block.markdown + "\n"
      }
    });
    out += "==================="
    return out
  }).join("\n");
  return out;
}

export async function createBoard(workspaceId: string, name: string) {
  const id = name.toLowerCase().replace(" ", "-")

  const workspaceRef = collection(db, "workspaces");
  const workspaceQuery = query(workspaceRef, where("id", "==", workspaceId));
  const workspaceSnapshot = await getDocs(workspaceQuery);
  if (workspaceSnapshot.empty) throw new Error("Workspace not found");

  const workspaceDocID = workspaceSnapshot.docs[0].id;

  const boards = collection(db, "workspaces", workspaceDocID, "boards")
  const d = doc(boards, id)

  const q = query(boards, where("name", "==", name))

  const existing = await getDocs(q);
  if (existing.docs.length > 0) return (existing.docs[0].data() as Board).id

  await setDoc(d, {
    id: id,
    name: name,
    blocks: [
      {
        type: "markdown",
        id: v4(),
        markdown: `# ${name}`,
        transform: {
          x: 400,
          y: 400,
          width: 400,
          height: 400,
        }
      }
    ],
    workspaceId: workspaceId
  } as Board)

  return id
}
