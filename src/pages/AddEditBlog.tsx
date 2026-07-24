import { useForm} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { blogSchema } from "../validation/blogSchema";
import type { BlogForm } from "../types/blog";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { createBlog, getBlogById } from "../services/blogService";
import { useAuth } from "../hooks/useAuth";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { updatingBlog } from "../services/blogService";
import "./addeditblog.css";


const AddEditBlog = () => { const {register,handleSubmit, reset,  formState: { errors }} = useForm<BlogForm>({resolver: zodResolver(blogSchema),});

    const {user} = useAuth()
    const navigate = useNavigate()
    const { id } = useParams(); 

    useEffect(()=>{
        try {

            if(!id) return;

            const fetchBlog = async() => {

                try {
                    
                    const blog = await getBlogById(id)

                    if (blog.authorId !== user?.uid) {
                        toast.error("You are not authorized to edit this blog.");
                        navigate("/");
                        return;
                    }

                    reset({
                        title : blog.title,
                        content : blog.content
                    })

                } catch (error) {
                    console.error(error);
                }
                
            }
            fetchBlog();
            
        } catch (error) {
            
        }
    },[id, user, reset, navigate])

    const onSubmit = async(data: BlogForm) => {
        if (!user) {
            toast.error("Please login first");
            navigate("/login");
            return;
        }
        try {

            if(id){
                await updatingBlog(id, data.title , data.content)
                toast.success("Blog updated successfully");
            }else{

                await createBlog({
                    title: data.title,
                    content: data.content,
                    authorId: user.uid,
                    authorName: user.displayName || "Anonymous"
                })
                toast.success("Blog published successfully");

            }      

            navigate("/");

        } catch (error) {

            console.error(error);
            toast.error("Failed to publish blog");
        }
    }
  

  return (
    <div className="blog-form-container">
      <div className="blog-form-card">
        <h2 className="blog-form-title">{id ? "Edit Blog Post" : "Create New Blog"}</h2>
        <p className="blog-form-subtitle">
          {id ? "Make changes to your published blog post" : "Write your story and share it with the community"}
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="blog-form">
            <div className="form-group">
                <label className="form-label">Blog Title</label>
                <input className="form-input" type="text" placeholder="Blog Title" {...register("title")} />
                <p className="error-message">{errors.title?.message}</p>
            </div>

            <div className="form-group">
                <label className="form-label">Blog Content</label>
                <textarea className="form-input form-textarea" rows={10} placeholder="Write your blog..." {...register("content")}/>
                <p className="error-message">{errors.content?.message}</p>
            </div>

            <div className="form-actions">
                <button type="submit" className="submit-button">{id ? "Update Blog" : "Publish Blog"}</button>
                <button type="button" className="cancel-button" onClick={() => navigate("/")}>Cancel</button>
            </div>

        </form>
      </div>
    </div>
  );
};

export default AddEditBlog;