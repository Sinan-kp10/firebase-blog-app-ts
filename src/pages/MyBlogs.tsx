import {  useEffect, useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { getUserBlogs } from "../services/blogService";
import type { Blog } from "../types/blog";
import BlogCard from "../components/blog/BlogCard";


const MyBlogs = () => {

    const [blogs, setBlogs] = useState<Blog[]>([])
    const [loading, setLoading] =useState(true)
    const {user} = useAuth()

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

          <div>
            <h1>My Blogs</h1>

            {blogs.length === 0 ? (
                <p>No blogs found.</p>
            ) : (
            blogs.map((blog) => (
                <BlogCard  key={blog.id} blog={blog} showActions/>
            ))
            )}
        </div>
    )

};

export default MyBlogs;