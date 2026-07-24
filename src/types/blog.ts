import { z } from "zod";
import { blogSchema } from "../validation/blogSchema";

export type CreateBlogData = {
  title: string;
  content: string;
  authorId: string;
  authorName: string;
};

export type BlogForm = z.infer<typeof blogSchema>;