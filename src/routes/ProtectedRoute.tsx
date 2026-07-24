import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import type { ReactNode } from "react";

type ProtectedRouteProps = {
  children: ReactNode;
};

const ProtectedRoute = ({children} : ProtectedRouteProps ) => {

    const {user ,loading} = useAuth()

    if (loading) {
        return <h2>Loading...</h2>;
    }

    if(!user){
        return <Navigate to="/login" replace />
    }
    return children
}

export default ProtectedRoute;