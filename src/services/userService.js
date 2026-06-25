import { userDocRef } from "@/lib/firestore";
import { getDoc, serverTimestamp, setDoc } from "firebase/firestore";

export async function ensureUserDocument(user) {
  if (!user?.uid) {
    return;
  }

  const profileRef = userDocRef(user.uid);
  const profileSnapshot = await getDoc(profileRef);

  if (profileSnapshot.exists()) {
    return;
  }

  await setDoc(profileRef, {
    uid: user.uid,
    displayName: user.displayName || "",
    email: user.email || "",
    photoURL: user.photoURL || "",
    createdAt: serverTimestamp(),
  });
}
