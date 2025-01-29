import { db } from "@/services/firebase";
import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  setDoc,
} from "firebase/firestore";
import { useNotice } from "@yamada-ui/react";
import { useCallback } from "react";
import { WatchList } from "./schema";

/**
 * @see https://firebase.google.com/docs/web/setup?hl=ja&_gl=1*1oqbw8y*_up*MQ..*_ga*ODIxMjgyOTc5LjE3MzgxNTk4NTU.*_ga_CW55HF8NVT*MTczODE1OTg1NS4xLjAuMTczODE1OTg1NS4wLjAuMA..
 */
export const useFirestore = () => {
  const notice = useNotice();

  const addToWatchList = async (
    userId: string = "0",
    dataId: string = "0",
    data: WatchList
  ) => {
    try {
      if (await checkIfInWatchList(userId, dataId)) {
        notice({
          title: "Error!",
          description: "This item is already in your wathclist.",
          status: "error",
          duration: 9000,
          isClosable: true,
        });
        return false;
      }
      await setDoc(doc(db, "users", userId, "watchlist", dataId), data);
      notice({
        title: "Success!",
        description: "Added to watchlist",
        status: "success",
        isClosable: true,
      });
    } catch (error) {
      console.log(error, "Error adding document");
      notice({
        title: "Error!",
        description: "An error occurred.",
        status: "error",
        isClosable: true,
      });
    }
  };

  const checkIfInWatchList = async (
    userId: string = "0",
    dataId: string = "0"
  ) => {
    const docRef = doc(db, "users", userId, "watchlist", dataId);

    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return true;
    } else {
      return false;
    }
  };

  const removeFromWatchList = async (
    userId: string = "0",
    dataId: string = "0"
  ) => {
    try {
      await deleteDoc(doc(db, "users", userId, "watchlist", dataId));
      notice({
        title: "Success!",
        description: "Removed from watchlist",
        status: "success",
        isClosable: true,
      });
    } catch (error) {
      notice({
        title: "Error!",
        description: "An error occurred.",
        status: "error",
        isClosable: true,
      });
      console.log(error, "Error while deleting doc");
    }
  };

  const getWatchList = useCallback(async (userId: string = "0") => {
    const querySnapshot = await getDocs(
      collection(db, "users", userId, "watchlist")
    );
    const data = querySnapshot.docs.map((doc) => ({
      ...doc.data(),
    }));
    return data;
  }, []);

  return {
    addToWatchList,
    checkIfInWatchList,
    removeFromWatchList,
    getWatchList,
  };
};
