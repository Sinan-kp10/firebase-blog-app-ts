import { useNavigate, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FirebaseError } from "firebase/app";
import { toast } from "react-toastify";
import { loginSchema } from "../validation/loginSchema";
import type { LoginForm } from "../type/auth";
import { loginUser } from "../services/authService";

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
        <>
            <form onSubmit={handleSubmit(onSubmit)}>

                <input type="email" placeholder="Enter your email" {...register("email")}/>
                <p>{errors.email?.message}</p>

                <input type="email" placeholder="Enter your password" {...register("password")}/>
                <p>{errors.password?.message}</p>

                <button type="submit">Login</button>
                <p>Don't have an account? <Link to="/signup">Signup</Link></p>

            </form>
        </>
    )
}

export default Login;