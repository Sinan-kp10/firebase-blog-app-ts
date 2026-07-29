import { useForm } from "react-hook-form"
import type { SignupForm } from "../types/auth"
import { zodResolver } from "@hookform/resolvers/zod";
import { signupSchema } from "../validation/signupSchema";
import { signupUser } from "../services/authService";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import { FirebaseError } from "firebase/app";
import { Eye, EyeOff } from "lucide-react";
import "./signup.css";
import { useState } from "react";




const Signup = () => {

    const {register, handleSubmit, formState : {errors}} = useForm<SignupForm>({ resolver : zodResolver(signupSchema)})
    const navigate = useNavigate()
    const [showPassword, setShowPassword] = useState(false)
        
    const onSubmit = async (data : SignupForm) =>{
        try{
            await signupUser(data.name , data.email ,data.password)

            toast.success("Account created successfully");
            navigate("/login")

        }catch (error){
            if (error instanceof FirebaseError) {
                switch (error.code) {
                    case "auth/email-already-in-use":
                    toast.error("Email already exists");
                    break;

                    case "auth/weak-password":
                    toast.error("Password should be at least 6 characters");
                    break;

                    case "auth/invalid-email":
                    toast.error("Invalid email address");
                    break;

                    default:
                    toast.error(error.message);
                }
            } else {
                toast.error("Something went wrong");
            }
        }
    }
    return (
        <div className="signup-container">
            <div className="signup-card">
                <h2 className="signup-title">Create an Account</h2>
                <p className="signup-subtitle">Join us by creating a new account</p>
                <form onSubmit={handleSubmit(onSubmit)} className="signup-form">
                    
                    <div className="form-group">
                        <label className="form-label" htmlFor="name">Full Name</label>
                        <input className="form-input" id="name" type="text" placeholder="Enter your name" {...register("name")} />
                        <p className="error-message">{errors.name?.message}</p>
                    </div>

                    <div className="form-group">
                        <label className="form-label" htmlFor="email">Email Address</label>
                        <input className="form-input" id="email" type="email" placeholder="Enter your email" {...register("email")} />
                        <p className="error-message">{errors.email?.message}</p>
                    </div>

                    <div className="form-group">
                        <label className="form-label" htmlFor="password">Password</label>
                        <input className="form-input" id="password" type={showPassword ? "text" : "password"} placeholder="Enter password" {...register("password")} />
                        <button type="button" onClick={()=> setShowPassword(!showPassword)} aria-label={showPassword ? "Hide password" : "Show password"}>{showPassword ? <EyeOff size={20} /> : <Eye size={20} />}</button>
                        <p className="error-message">{errors.password?.message}</p>
                    </div>

                    <div className="form-group">
                        <label className="form-label" htmlFor="confPass">Confirm Password</label>
                        <input className="form-input" id="confPass" type={showPassword ? "text" : "password"} placeholder="Confirm password" {...register("confirmPassword")} />
                        <button type="button" onClick={()=> setShowPassword(!showPassword)} aria-label={showPassword ? "Hide password" : "Show password"}>{showPassword ? <EyeOff size={20} /> : <Eye size={20} />}</button>
                        <p className="error-message">{errors.confirmPassword?.message}</p>
                    </div>

                    <button type="submit" className="submit-button">Sign Up</button>
                    
                    <p className="auth-redirect">
                        Already have an account? <Link to="/login" className="auth-link">Login</Link>
                    </p>

                </form>
            </div>
        </div>
    )
}

export default Signup