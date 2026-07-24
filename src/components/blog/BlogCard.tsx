import type { Blog } from "../../types/blog";
import { Link } from "react-router-dom";
import "./blogcard.css";
import {useAuth} from "../../hooks/useAuth";

type BlogCardProps = {
    blog: Blog;
};


const BlogCard = ({ blog }: BlogCardProps) => {

    const {user} = useAuth()

    return (
        <div className="blog-card">

            <h2 className="blog-card-title">{blog.title}</h2>

            <div className="blog-card-meta">
                <p className="blog-card-author"> By <span className="blog-author-highlight">{blog.authorName}</span> </p>
                <p className="blog-card-date">{(blog.createdAt.toDate()).toLocaleDateString()}</p>
            </div>

            <p className="blog-card-content">{blog.content}</p>

            <div className="blog-card-actions">

                {user?.uid === blog.authorId && (
                    <Link to={`/blog/edit/${blog.id}`} className="blog-card-link">
                        <button className="blog-card-btn edit-btn">Edit</button>
                    </Link>
                )}

                {user?.uid === blog.authorId && (
                    <Link to={`/blog/delete/${blog.id}`} className="blog-card-link">
                        <button className="blog-card-btn delete-btn">Delete</button>
                    </Link>
                )}

                
                
            </div>
        </div>
    );
}

export default BlogCard;