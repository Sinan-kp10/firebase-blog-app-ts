import { useEffect, useState } from "react";
import { getAllBlogs } from "../services/blogService";
import type { Blog } from "../types/blog";
import BlogCard from "../components/blog/BlogCard";

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
        return <h2>Loading...</h2>;
    }
    return (
        
        <div>
            
            <h1>All Blogs</h1>

            {blogs.length === 0 ? (
                <h3>No blogs found.</h3>
                ) : (
            blogs.map((blog) => (
                <BlogCard  key={blog.id}  blog={blog}/>
                ))
            )}
        </div>
        
    )
}

export default BlogList;