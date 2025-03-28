import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import { toast } from "react-toastify";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC43mWXLvIODM7DMJ7qdB6lUVQSv6O0dNo",
  authDomain: "netflix-clone-3696a.firebaseapp.com",
  projectId: "netflix-clone-3696a",
  storageBucket: "netflix-clone-3696a.firebasestorage.app",
  messagingSenderId: "496777069793",
  appId: "1:496777069793:web:962f9f8905a3bb242423a0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const signup = async (name, email, password) =>{
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;
    await addDoc(collection(db, "user"), {
      uid: user.uid,
      name,
      authProvider: "local",
      email,
    })
  } catch (error) {
    console.log("Error", error.message);
    toast.error(error.code.split('/')[1].split('-').join(" "));
  }
}

const login = async (email, password)=>{
  try {
    await signInWithEmailAndPassword(auth, email, password)
  } catch (error) {
    console.log("Error:", error.message);
    toast.error(error.code.split('/')[1].split('-').join(" "));
  }
}

const logout = () => {
  signOut(auth);
}

export {auth, db, login, signup, logout};