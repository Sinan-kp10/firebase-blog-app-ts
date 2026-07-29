import { useNavigate, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FirebaseError } from "firebase/app";
import { toast } from "react-toastify";
import { loginSchema } from "../validation/loginSchema";
import type { LoginForm } from "../types/auth";
import { loginUser } from "../services/authService";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import "./login.css";


const Login = () =>{

    const {register, handleSubmit, formState: {errors}} =  useForm<LoginForm>({resolver : zodResolver(loginSchema)})
    const navigate = useNavigate()
    const [showPassword, setShowPassword] = useState(false)

    const onSubmit = async(data : LoginForm) =>{
        try {
            
            await loginUser(data.email , data.password)
            toast.success("Login Successfully");
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
                        <label className="form-label" htmlFor="email">Email Address</label>
                        <input className="form-input" id="email" type="email" placeholder="Enter your email" {...register("email")}/>
                        <p className="error-message">{errors.email?.message}</p>
                    </div>

                    <div className="form-group">
                        <label className="form-label" htmlFor="password">Password</label>
                        <input className="form-input" id="password" type={showPassword ? "text" : "password"} placeholder="Enter your password" {...register("password")}/>
                        <button type="button" onClick={()=> setShowPassword(!showPassword)} aria-label={showPassword ? "Hide password" : "Show password"}> {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}</button>
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