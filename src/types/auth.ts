import { z } from "zod";
import { signupSchema } from "../validation/signupSchema";
import { loginSchema } from "../validation/loginSchema";
import type { ReactNode } from "react";

export type SignupForm = z.infer<typeof signupSchema>;
export type LoginForm = z.infer<typeof loginSchema>;



export type UserProviderProps = {
  children: ReactNode;
};