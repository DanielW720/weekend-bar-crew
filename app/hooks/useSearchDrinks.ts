import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { firestore, storage } from "../firebase";
import { getDownloadURL, ref } from "firebase/storage";
import { useSearchParams } from "next/navigation";

const collection = "drinks";
const document = "4HqhhjG9Ofv8HJ31rgwk";
const imageUrl = "public/drinkImages/old-fashioned.jpg";

/**
 * Fetch drinks from Firestore by listening to URL search params.
 * @returns List with items and loading state
 */
export default function useSearchDrinks() {
  const [items, setItems] = useState<any>([]);
  const [loading, setLoading] = useState(true);
  const searchParams = useSearchParams();
  const docRef = doc(firestore, collection, document);
  const imageRef = ref(storage, imageUrl);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const docSnap = await getDoc(docRef);
        const docData = docSnap.data();

        const imageUrl = await getDownloadURL(imageRef);

        // Create an item and item to list of items
        if (
          docData &&
          docData["description"] &&
          docData["description_short"] &&
          docData["name"] &&
          imageUrl
        ) {
          const item = {
            name: docData["name"],
            description: docData["description"],
            shortDescription: docData["description_short"],
            imageUrl: imageUrl,
          };
          setItems([item]);
          setLoading(false);
        }
      } catch (error) {
        throw new Error("Error fetching from Firestore");
      }
    };
    fetchData();
  }, [searchParams]);

  return [items, loading];
}
