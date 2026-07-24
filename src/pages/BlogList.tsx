import { useEffect, useState } from "react";
import { getAllBlogs } from "../services/blogService";
import type { Blog } from "../types/blog";
import BlogCard from "../components/blog/BlogCard";
import "./bloglist.css";

const BlogList = () =>{

    const [blogs,setBlogs]= useState<Blog[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(()=>{

        const fetchBlogs = async() =>{
            
            try {
                
                const data = await getAllBlogs()
                setBlogs(data)

            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false)
            }
        }

        fetchBlogs();
    },[])

    if (loading) {
        return (
            <div className="blog-list-loading-container">
                <div className="loading-spinner"></div>
            </div>
        );
    }
    return (
        
        <div className="blog-list-container">
            
            <h1 className="blog-list-title">All Blogs</h1>

            {blogs.length === 0 ? (
                <h3 className="no-blogs-message">No blogs found.</h3>
                ) : (
                <div className="blog-grid">
                    {blogs.map((blog) => (
                        <BlogCard  key={blog.id}  blog={blog}/>
                    ))}
                </div>
            )}
        </div>
        
    )
}

export default BlogList;