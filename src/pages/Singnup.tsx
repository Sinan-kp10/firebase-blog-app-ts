import { useForm } from "react-hook-form"
import type { SignupForm } from "../type/auth"
import { zodResolver } from "@hookform/resolvers/zod";
import { signupSchema } from "../validation/signupSchema";
import { signupUser } from "../services/authService";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";



const Signup = () => {

    const {register, handleSubmit, formState : {errors}} = useForm<SignupForm>({ resolver : zodResolver(signupSchema)})
    const navigate = useNavigate()
        
    const onSubmit = async (data : SignupForm) =>{
        try{
            await signupUser(data.name , data.email ,data.password)

            toast.success("Account created successfully");
            navigate("/login")

        }catch (error){
            console.log(error)
            toast.error("Signup Failed")
        }
    }
    return(
        <>
            <h1>Sign Up</h1>
            <form onSubmit={handleSubmit(onSubmit)}>

                <input type="text" placeholder="Enter your name" {...register("name")} />
                <p>{errors.name?.message}</p>

                <input type="email" placeholder="Enter your email" {...register("email")} />
                <p>{errors.email?.message}</p>

                <input type="password" placeholder="Enter password" {...register("password")} />
                <p>{errors.password?.message}</p>

                <input type="password" placeholder="Confirm password" {...register("confirmPassword")} />
                <p>{errors.confirmPassword?.message}</p>

                <button type="submit">Sign Up</button>

            </form>
            
        </>
    )
}

export default Signup