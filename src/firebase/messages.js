import { onMessage } from "firebase/messaging";
import { db, messaging } from "./firebase";
import {
  addDoc,
  collection,
  doc,
  getDocs,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
  where,
} from "firebase/firestore";

export const onMessageListener = () =>
  new Promise((resolve) => {
    onMessage(messaging, (payload) => {
      resolve(payload);
    });
  });

export const checkExistingChat = async (userId) => {
  try {
    const q = query(
      collection(db, "Chat"),
      where("members", "array-contains", userId)
    );

    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      const roomDoc = querySnapshot.docs[0];
      return { exists: true, roomId: roomDoc.id };
    }

    return { exists: false };
  } catch (error) {
    console.error("Error checking chat room:", error);
    return { exists: false };
  }
};

export const sendMessage = async (roomId, message, sender = userId) => {
  if (!roomId) {
    console.error("No roomId found, cannot send message");
    return;
  }
  try {
    const roomRef = doc(db, "Chat", roomId);
    await setDoc(roomRef, { createdAt: serverTimestamp() }, { merge: true });
    await addDoc(collection(db, "Chat", roomId, "messages"), {
      content: message,
      senderId: sender,
      createdAt: serverTimestamp(),
    });

    await setDoc(
      roomRef,
      {
        last_msg: {
          content: message,
          senderId: sender,
          createdAt: serverTimestamp(),
        },
        updated_at: serverTimestamp(),
      },
      { merge: true }
    );
  } catch (error) {
    console.error("Error sending message:", error);
  }
};

export const subscribeToMessages = (roomId, callback) => {
  const messagesRef = collection(db, "Chat", roomId, "messages");
  const q = query(messagesRef, orderBy("createdAt", "asc"));

  const unsubscribe = onSnapshot(q, (snapshot) => {
    const msgs = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    callback(msgs);
  });

  return unsubscribe;
};
