
import { db } from "../config/firebase";
import { doc, getDoc } from "firebase/firestore";

export async function getBoardMarkdown(workspaceId: string, boardId: string): Promise<string> {
  const boardDocRef = doc(db, "workspaces", workspaceId, "boards", boardId);
  const snapshot = await getDoc(boardDocRef);
  if (snapshot.exists()) {
    return snapshot.data().markdown || "";
  } else {
    throw new Error(`Board document '${boardId}' in workspace '${workspaceId}' does not exist.`);
  }
}

// async function testGetBoardMarkdown() {
//     try {
//     const workspaceId = "e5818093-fb28-46d2-a86c-1080b629848b";
//     const boardId = "e5818093-fb28-46d2-a86c-1080b629848b";
//     const markdown = await getBoardMarkdown(workspaceId, boardId);
//     console.log("Markdown data:", markdown);
//     } catch (error) {
//     console.error("Error fetching markdown:", error);
//     }
// }

// testGetBoardMarkdown();
//please test this before actually accepting this