import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { blogSchema } from "../validation/blogSchema";
import type { BlogForm } from "../types/blog";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { createBlog } from "../services/blogService";
import { useAuth } from "../hooks/useAuth";


const AddEditBlog = () => { const {register,handleSubmit, formState: { errors }} = useForm<BlogForm>({resolver: zodResolver(blogSchema),});

    const {user} = useAuth()
    const navigate = useNavigate()

    const onSubmit = async(data: BlogForm) => {
        if (!user) {
            toast.error("Please login first");
            navigate("/login");
            return;
        }
        try {

            await createBlog({
                title: data.title,
                content: data.content,
                authorId: user.uid,
                authorName: user.displayName || "Anonymous"
            })
            toast.success("Blog published successfully");

            navigate("/");

        } catch (error) {

            console.error(error);
            toast.error("Failed to publish blog");
        }
    }
  

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input type="text" placeholder="Blog Title" {...register("title")} />

      <p>{errors.title?.message}</p>

      <textarea rows={8} placeholder="Write your blog..." {...register("content")}/>
      <p>{errors.content?.message}</p>

      <button type="submit">Publish Blog</button>
    </form>
  );
};

export default AddEditBlog;