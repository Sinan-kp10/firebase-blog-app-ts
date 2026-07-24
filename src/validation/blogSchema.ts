import { z } from "zod";

export const blogSchema = z.object({
    
  title: z.string().min(5, "Title must be at least 5 characters").max(100, "Title cannot exceed 100 characters"),
  content: z.string().min(20, "Content must be at least 20 characters")

});