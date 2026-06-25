import {
  addDoc,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  limit,
  orderBy,
  query,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { userCollectionRef } from "@/lib/firestore";

const COLLECTION_NAME = "routines";
const DEFAULT_LIMIT = 50;

function collectionRef(uid) {
  return userCollectionRef(uid, COLLECTION_NAME);
}

function documentRef(uid, id) {
  return doc(collectionRef(uid), id);
}

function serializeDocument(snapshot) {
  return {
    id: snapshot.id,
    ...snapshot.data(),
  };
}

export async function create(uid, data) {
  const docRef = await addDoc(collectionRef(uid), {
    ...data,
    createdAt: serverTimestamp(),
  });

  return docRef.id;
}

export async function getById(uid, id) {
  const snapshot = await getDoc(documentRef(uid, id));

  if (!snapshot.exists()) {
    return null;
  }

  return serializeDocument(snapshot);
}

export async function list(uid, options = {}) {
  const maxResults = options.limit || DEFAULT_LIMIT;
  const snapshot = await getDocs(
    query(collectionRef(uid), orderBy("createdAt", "desc"), limit(maxResults)),
  );

  return snapshot.docs.map(serializeDocument);
}

export async function update(uid, id, data) {
  await updateDoc(documentRef(uid, id), {
    ...data,
    updatedAt: serverTimestamp(),
  });
}

export async function remove(uid, id) {
  await deleteDoc(documentRef(uid, id));
}

export const routineService = {
  create,
  getById,
  list,
  update,
  delete: remove,
};
