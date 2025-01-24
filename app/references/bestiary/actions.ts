import { firebaseDB } from "@/utils/firebase/client";
import { collection, doc, getDoc, getDocs, orderBy, query } from "firebase/firestore";
import { Monster, MonsterBase } from "./type";

export const fetchMonsters = async () => {
  try {
    const collectionRef = collection(firebaseDB, "monsters");
    const q = query(collectionRef, orderBy("name", "asc"));

    const results = await getDocs(q);

    return results.docs.map<MonsterBase>((doc) => {
      const { type, subtype, name, id, size, hitPoints } = doc.data() as Monster;

      return {
        type,
        subtype,
        name,
        id,
        size,
        hitPoints,
      };
    });
  } catch (error) {
    console.error("Error fetching monsters:", error);
    throw error;
  }
};

export const fetchMonster = async (id: string | null) => {
  try {
    if (!id) return;

    const docRef = doc(firebaseDB, "monsters", id);

    const docSnap = await getDoc(docRef);

    const data = docSnap.data() as Monster;

    console.log("fetchMonster", data);

    return data;
  } catch (error) {
    console.error("Error fetching monster:", error);
    throw error;
  }
};
