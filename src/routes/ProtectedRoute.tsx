import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import type { UserProviderProps } from "../types/auth";


const ProtectedRoute = ({children} : UserProviderProps ) => {

    const {user ,loading} = useAuth()

    if (loading) {
        return (
            <div className="blog-list-loading-container">
                <div className="loading-spinner"></div>
            </div>
        );
    }

    if(!user){
        return <Navigate to="/login" replace />
    }
    return children
}

export default ProtectedRoute;