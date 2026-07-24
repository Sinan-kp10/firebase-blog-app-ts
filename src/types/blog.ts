import { z } from "zod";
import { blogSchema } from "../validation/blogSchema";
import { Timestamp } from "firebase/firestore";

export type CreateBlogData = {
  title: string;
  content: string;
  authorId: string;
  authorName: string;
};

export type Blog = {
  id: string;
  title: string;
  content: string;
  authorId: string;
  authorName: string;
  createdAt: Timestamp;
};


export type BlogForm = z.infer<typeof blogSchema>;