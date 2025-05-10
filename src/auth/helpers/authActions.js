import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";
import { auth } from "../../firebase/firebaseInit";
import { GoogleAuthProvider } from "firebase/auth";

const provider = new GoogleAuthProvider();

const loginEmailPassword = async(email, password) =>{

    try {
        const userCredentials = await signInWithEmailAndPassword(auth, email, password)
        console.log({userCredentials})
        return userCredentials
    } catch (error) {
        return error
    }
}

const loginWithGoogle = async() =>{
    try {
        const userCredentials = await signInWithPopup(auth, provider)
        console.log({userCredentials})
        return userCredentials
    } catch (error) {
        return error
    }
}

const registerEmailPassword = async(email, password) =>{
    try {
        const userCredentials = await createUserWithEmailAndPassword(auth,email,password)
        console.log({userCredentials})
        return userCredentials
    } catch (error) {
        return error
    }

}

const accountSignOut = async() =>{
    try {
        await signOut(auth);
    } catch (error) {
        return error
    }
}

export {
    loginEmailPassword,
    loginWithGoogle,
    registerEmailPassword,
    accountSignOut
}