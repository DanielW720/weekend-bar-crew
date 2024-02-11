import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { firestore } from "../firebase";

const collection = "testcollection";
const document = "testdoc1";

/**
 * Fetch drinks from Firestore.
 * @returns List with items and loading state
 */
export default function useFirestoreDrinks() {
  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState([]);
  const docRef = doc(firestore, collection, document);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const docSnap = await getDoc(docRef);
        console.log("Document data:", docSnap.data());
      } catch (error) {
        throw new Error("Error fetching from Firestore");
      }
    };
    fetchData();
    setLoading(false);
  }, []);

  return [items, loading];
}
