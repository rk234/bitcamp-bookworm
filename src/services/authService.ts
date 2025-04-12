import { signInWithPopup, signOut } from "firebase/auth/web-extension";
import { auth, db } from "../config/firebase";
import { GoogleAuthProvider } from "firebase/auth";
import { collection, doc, getDoc, setDoc } from "firebase/firestore";
import { UserProfile } from "../types/user";

export async function loginOrRegisterUser(): Promise<UserProfile> {
  const res = await signInWithPopup(auth, new GoogleAuthProvider())
  return await createUser(res.user.uid, res.user.displayName ?? "Unnamed User", res.user.email ?? "");
}


export async function createUser(uid: string, displayName: string, email: string) {
  const users = collection(db, "users")
  const userDoc = doc(users, uid)

  const res = await getDoc(userDoc)
  if (!res.exists()) {
    const profile: UserProfile = {
      uid: uid,
      displayName: displayName,
      email: email
    }

    await setDoc(userDoc, profile)
    return profile;
  } else {
    console.log("user already exists, not creating new profile");
    return ((await getDoc(userDoc)).data() as UserProfile)
  }
}

export async function getUserById(uid: string) {
  const users = collection(db, "users")
  const userDoc = doc(users, uid)
  return ((await getDoc(userDoc)).data()) as UserProfile
}

export async function logoutUser() {
  await signOut(auth);
}
