import { doc, getDoc, setDoc } from "firebase/firestore"; 
import { db } from "../firebase/firebaseInit";


const setFavoriteTeam = async(user, team) =>{
    try {
        const docRef = await setDoc(doc(db, "users",`${user.uid}`), {
          user: user.uid,
          team: team.name,
          teamId: team.id,
          teamPhoto: team.logo
        });
        console.log("Document written with ID: ", docRef.id);
    } catch (e) {
        console.error("Error adding document: ", e);
    }
}

const getFavoriteTeam = async(user) =>{
    try {
        const docRef = await getDoc(doc(db, "users",`${user.uid}`));
        return docRef.data()
    } catch (e) {
        console.error("Error adding document: ", e);
    }
}


export{
    setFavoriteTeam,
    getFavoriteTeam,
}