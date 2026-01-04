import { db } from "../../scripts/firebase.js";
import {
  collection,
  getDocs,
  query,
  orderBy
} from "https://www.gstatic.com/firebasejs/10.2.0/firebase-firestore.js";

export async function fetchTaken() {
  const q = query(
    collection(db, "taken"),
    orderBy("weekNumber"),
    orderBy("createdAt")
  );

  const snapshot = await getDocs(q);
  const takenPerWeek = {};

  snapshot.forEach(doc => {
    const taak = doc.data();
    (takenPerWeek[taak.weekNumber] ??= []).push(taak);
  });

  return takenPerWeek;
}
