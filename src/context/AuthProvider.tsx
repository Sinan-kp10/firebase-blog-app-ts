import { useEffect, useState, type ReactNode } from "react";
import { onAuthStateChanged, type User } from "firebase/auth";
import { auth } from "../firebase/firebase";
import { AuthContext } from "./AuthContext";


type AuthProviderProps = {
  children: ReactNode;
};


export const AuthProvider = ({children} : AuthProviderProps ) =>{

    const [user, setUser] = useState<User | null>(null)

    useEffect(()=>{

        const unsubscribe = onAuthStateChanged(auth, (currentUser)=> setUser(currentUser))

        return () => unsubscribe()

    },[])

    return (
        <AuthContext.Provider value={{user}}>
            {children}
        </AuthContext.Provider>
    )

}

