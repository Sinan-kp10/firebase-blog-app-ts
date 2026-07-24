import { auth } from "../firebase/firebase";
import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";



export const signupUser = async (name: string, email: string, password:string)=>{

    const userCredetial = await createUserWithEmailAndPassword(auth, email, password)

    await updateProfile(userCredetial.user, {
        displayName : name
    })

    return userCredetial.user

}


export  const loginUser = async (email: string, password : string)=>{

    const userCredetial = await signInWithEmailAndPassword(auth , email, password)

    return userCredetial.user
}

export const logoutUser = async() => {
    await signOut(auth)
}