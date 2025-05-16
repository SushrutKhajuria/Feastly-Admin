import { db } from "../firebase/firebaseConfig";
import {
  collection,
  getDocs,
  doc,
  updateDoc,
  serverTimestamp,
} from "firebase/firestore";

const ordersRef = collection(db, "orders");

export const getOrders = async () => {
  const snapshot = await getDocs(ordersRef);
  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
};

export const updateOrderStatus = async (id, newStatus) => {
  const orderDoc = doc(db, "orders", id);
  await updateDoc(orderDoc, {
    status: newStatus,
    updatedAt: serverTimestamp(),
  });
};
