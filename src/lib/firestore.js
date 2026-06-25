import { db } from "@/lib/firebase";
import { collection, doc } from "firebase/firestore";

export function userDocRef(userId) {
  return doc(db, "users", userId);
}

export function userCollectionRef(userId, collectionName) {
  return collection(db, "users", userId, collectionName);
}
