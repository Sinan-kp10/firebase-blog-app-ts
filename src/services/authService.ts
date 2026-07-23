import { auth } from "../firebase/firebase";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";


export const signupUser = async (name: string, email: string, password:string)=>{

    const userCredetial = await createUserWithEmailAndPassword(auth, email, password)

    await updateProfile(userCredetial.user, {
        displayName : name
    })

    return userCredetial.user

}


