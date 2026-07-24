import {  useEffect, useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { getUserBlogs } from "../services/blogService";
import type { Blog } from "../types/blog";
import BlogCard from "../components/blog/BlogCard";
import { deleteBlog } from "../services/blogService";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import DeleteModal from "../components/blog/DeleteModal";
import "./myblogs.css";



const MyBlogs = () => {

    const [blogs, setBlogs] = useState<Blog[]>([])
    const [loading, setLoading] =useState(true)
    const {user} = useAuth()
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [blogToDelete, setBlogToDelete] = useState<string | null>(null)

    const handleDeleteClick = (id : string) => {
        setBlogToDelete(id);
        setIsModalOpen(true);
    };

    const handleConfirmDelete = async() => {
        if (!blogToDelete) return;
        try {
            await deleteBlog(blogToDelete);
            setBlogs((prevBlogs)=> prevBlogs.filter((blog)=> blog.id !== blogToDelete));
            toast.success("Blog deleted successfully.");
        } catch (error) {
            console.error(error);
            toast.error("Failed to delete blog.");
        } finally {
            setIsModalOpen(false);
            setBlogToDelete(null);
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

          <div className="my-blogs-container">
            <Link to="/" className="back-to-home">
                <span className="back-icon">←</span> Back to Home
            </Link>
            <h1 className="my-blogs-title">My Blogs</h1>

            {blogs.length === 0 ? (
                <p className="no-blogs-message">No blogs found.</p>
            ) : (
            <div className="my-blogs-grid">
                {blogs.map((blog) => (
                    <BlogCard  key={blog.id} blog={blog} showActions  onDelete={handleDeleteClick}/>
                ))}
            </div>
            )}

            <DeleteModal 
                isOpen={isModalOpen} 
                onClose={() => setIsModalOpen(false)} 
                onConfirm={handleConfirmDelete} 
            />
        </div>
    )

};

export default MyBlogs;