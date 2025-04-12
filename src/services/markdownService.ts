import { db} from "../config/firebase";
import { doc, getDoc } from "firebase/firestore";

export async function getMarkdown(): Promise<string> {

    const docRef = doc(db, "markdown", "content");
    const docSnap = await getDoc(docRef);
    return docSnap.exists() ? (docSnap.data() as any).markdown || "" : "";
}