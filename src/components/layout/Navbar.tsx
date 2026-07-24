import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { logoutUser } from "../../services/authService";
import { toast } from "react-toastify";

const Navbar = () => {
    
    const { user } = useAuth()
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await logoutUser();

            toast.success("Logged out successfully")

            navigate("/login")
        } catch (error) {

            console.error(error)
            toast.error("Failed to logout")
        }
    };

    return(
        <nav>
            <Link to="/">Home</Link>
            <Link to="/blog/new">Create Blog</Link>
            {user && <p>{user.displayName}</p>}
            <button onClick={handleLogout}>Logout</button>

        </nav>
    )
}

export default Navbar;