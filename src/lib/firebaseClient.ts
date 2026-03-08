// firebaseClient.ts
import { initializeApp } from "firebase/app";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAGWaxDYbXL4VCdfznfwVt5ZZ8lkNoWN1Y",
  authDomain: "dobok1-c52a9.firebaseapp.com",
  projectId: "dobok1-c52a9",
  storageBucket: "dobok1-c52a9.firebasestorage.app",
  messagingSenderId: "84619673322",
  appId: "1:84619673322:web:ed6c5ca97b8c558a5d2193",
  measurementId: "G-90FJY102WC",
};

const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);

export const uploadImage = async (file: File, folder: string = "products") => {
  const storageRef = ref(storage, `${folder}/${Date.now()}-${file.name}`);
  const snapshot = await uploadBytesResumable(storageRef, file);
  const url = await getDownloadURL(snapshot.ref);
  return url; // DB에 저장할 URL
};
