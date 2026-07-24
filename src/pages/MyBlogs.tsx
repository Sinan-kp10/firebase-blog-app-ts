import {  useEffect, useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { getUserBlogs } from "../services/blogService";
import type { Blog } from "../types/blog";
import BlogCard from "../components/blog/BlogCard";
import { deleteBlog } from "../services/blogService";
import { toast } from "react-toastify";
import "./bloglist.css";



const MyBlogs = () => {

    const [blogs, setBlogs] = useState<Blog[]>([])
    const [loading, setLoading] =useState(true)
    const {user} = useAuth()

    const handleDelete = async(id : string) =>{

        const confirmed = window.confirm("Are you sure you want to delete this blog?")

        if (!confirmed) return;

        try {
            
            await deleteBlog(id)

            setBlogs((prevBlogs)=> prevBlogs.filter((blog)=> blog.id !== id))
            toast.success("Blog deleted successfully.");
        } catch (error) {
            console.error(error);
            toast.error("Failed to delete blog.");
            
        }
    }

    useEffect(()=>{
        
        if(!user) return
        const fetchBlogs = async() => {

            try {

                const data = await getUserBlogs(user.uid)
                setBlogs(data)
                
            } catch (error) {
                console.log(error)
            }finally {
                setLoading(false);
            }
        }
        fetchBlogs()

    },[user])

    if (loading) {
        return (
            <div className="blog-list-loading-container">
                <div className="loading-spinner"></div>
            </div>
        );
    }

    return (

          <div className="blog-list-container">
            <h1 className="blog-list-title">My Blogs</h1>

            {blogs.length === 0 ? (
                <p className="no-blogs-message">No blogs found.</p>
            ) : (
            <div className="blog-grid">
                {blogs.map((blog) => (
                    <BlogCard  key={blog.id} blog={blog} showActions  onDelete={handleDelete}/>
                ))}
            </div>
            )}
        </div>
    )

};

export default MyBlogs;