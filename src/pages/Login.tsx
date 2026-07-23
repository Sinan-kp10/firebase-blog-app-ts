import { useNavigate, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FirebaseError } from "firebase/app";
import { toast } from "react-toastify";
import { loginSchema } from "../validation/loginSchema";
import type { LoginForm } from "../type/auth";
import { loginUser } from "../services/authService";
import "./login.css";


const Login = () =>{

    const {register, handleSubmit, formState: {errors}} =  useForm<LoginForm>({resolver : zodResolver(loginSchema)})
    const navigate = useNavigate()

    const onSubmit = async(data : LoginForm) =>{
        try {
            
            await loginUser(data.email , data.password)
            toast.success("Login Successful");
            navigate("/");
        } catch (error) {
            if(error instanceof FirebaseError){
                switch (error.code) {
                    case "auth/invalid-credential":
                        toast.error("Invalid email or password");
                        break;

                    case "auth/user-not-found":
                        toast.error("User not found. Please sign up.");
                        break;

                    default:
                        toast.error(error.message);
                }
            }
        }

    }

    return (
        <div className="login-container">
            <div className="login-card">
                <h2 className="login-title">Welcome Back</h2>
                <p className="login-subtitle">Please enter your details to sign in</p>
                <form onSubmit={handleSubmit(onSubmit)} className="login-form">
                    
                    <div className="form-group">
                        <label className="form-label">Email Address</label>
                        <input className="form-input" type="email" placeholder="Enter your email" {...register("email")}/>
                        <p className="error-message">{errors.email?.message}</p>
                    </div>

                    <div className="form-group">
                        <label className="form-label">Password</label>
                        <input className="form-input" type="password" placeholder="Enter your password" {...register("password")}/>
                        <p className="error-message">{errors.password?.message}</p>
                    </div>

                    <button type="submit" className="submit-button">Login</button>
                    
                    <p className="auth-redirect">
                        Don't have an account? <Link to="/Signup" className="auth-link">Signup</Link>
                    </p>

                </form>
            </div>
        </div>
    )
}

export default Login;