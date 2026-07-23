import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";


export const useAuth = () => {
    const userData = useContext(AuthContext)

    if(!userData){
        throw new Error("useAuth must be used inside AuthProvider");
    }

      return userData;
}

export default useAuth;