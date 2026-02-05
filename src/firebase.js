import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import { toast } from "react-toastify";

const firebaseConfig = {
  apiKey: "AIzaSyB_5ajDm6T46_ajuO4Q5Cc4N2msLiSsCII",
  authDomain: "netflix-clone-a3135.firebaseapp.com",
  projectId: "netflix-clone-a3135",
  storageBucket: "netflix-clone-a3135.firebasestorage.app",
  messagingSenderId: "279772488322",
  appId: "1:279772488322:web:71d05086143c9ce5178a9b"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const signup = async(name,email,password) =>{
    try{
        const res = await createUserWithEmailAndPassword(auth,email,password);
        const user = res.user;
        await addDoc(collection(db,"user"),{
            uid : user.uid,
            name,
            authProvider : "local",
            email,
        })
    }
    catch(e){
        console.log(e);
        toast.error(e.code);
    }
}
const login = async (email,password) =>{
    try{
        await signInWithEmailAndPassword(auth,email,password);
    }
    catch(e){
        console.log(e);
        toast.error(e.code);
    }
}
const logout = async() =>{
    signOut(auth);
}

export {auth,db,login,signup,logout}