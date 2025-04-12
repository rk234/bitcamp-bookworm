import { auth, db } from "../config/firebase";
import { GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
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
    console.log("created profile")

    await setDoc(userDoc, profile)
    return profile;
  } else {
    console.log("user already exists, not creating new profile");
    const profile = (await getDoc(userDoc)).data() as UserProfile
    console.log(profile)
    return profile
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
