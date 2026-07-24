import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { logoutUser } from "../../services/authService";
import { toast } from "react-toastify";
import "./navbar.css";

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
        <nav className="navbar">
            <Link to="/" className="navbar-logo">Blogify</Link>
            <Link to="/blog/new" className="navbar-link">Create Blog</Link>
            {user && <p className="navbar-user">{user.displayName || "User"}</p>}
            <button onClick={handleLogout} className="navbar-logout">Logout</button>

        </nav>
    )
}

export default Navbar;