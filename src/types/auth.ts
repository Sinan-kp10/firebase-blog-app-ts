import { z } from "zod";
import { signupSchema } from "../validation/signupSchema";
import { loginSchema } from "../validation/loginSchema";

export type SignupForm = z.infer<typeof signupSchema>;
export type LoginForm = z.infer<typeof loginSchema>;