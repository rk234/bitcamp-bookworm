import { db } from "@/config/firebase";
import { Board } from "@/types/workspace";
import { collection, query, where, getDocs, doc, setDoc, } from "firebase/firestore";
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
  const boardDocs = await getAllWorkspaceBoardDocs(workspaceID);

  return boardDocs.map((doc) => doc.data() as Board)
}


export const getAllWorkspaceText = async (workspaceID: string) => {

  const boards = await getAllWorkspaceBoardDocs(workspaceID);
  const out = boards.map((doc) => {
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
          x: 200,
          y: 200,
          width: 400,
          height: 150,
        }
      }
    ],
    workspaceId: workspaceId
  } as Board)

  return id
}

export async function getNetworkStuff(workspaceID: string) {

  let out: {
    nodes: {id: string, x: number, y: number, url: string}[]
    links: {source: string, target: string}[]
  } = {
    nodes: [],
    links: [],
  };
  let boards = await getAllBoardsInWorkspace(workspaceID);

  boards.forEach(board => {
    out.nodes.push({id: board.name, x: 0, y: 0, url: "/edit/"+workspaceID+"/"+board.id})
    let content = ""

    board.blocks.forEach(block => {
      if (block.type == "markdown") {
        content += block.markdown + "\n"
      }
    });

    boards.forEach(otherBoard => {
      if(content.includes(`[${otherBoard.name}](/new`)) {
        out.links.push({source: board.name, target: otherBoard.name})
      }
    });
  });

  console.log(out);
  return out;
  
}
