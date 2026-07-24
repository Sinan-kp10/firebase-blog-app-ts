import type { Blog } from "../../types/blog";
import { Link } from "react-router-dom";
import "./blogcard.css";

type BlogCardProps = {
    blog: Blog;
    showActions?: boolean;
};


const BlogCard = ({ blog, showActions= false }: BlogCardProps) => {

    return (
        <div className="blog-card">

            <h2 className="blog-card-title">{blog.title}</h2>

            <div className="blog-card-meta">
                <p className="blog-card-author"> By <span className="blog-author-highlight">{blog.authorName}</span> </p>
                <p className="blog-card-date">{(blog.createdAt.toDate()).toLocaleDateString()}</p>
            </div>

            <p className="blog-card-content">{blog.content}</p>

            <div className="blog-card-actions">

                {showActions && (
                    <Link to={`/blog/edit/${blog.id}`} className="blog-card-link">
                        <button className="blog-card-btn edit-btn">Edit</button>
                    </Link>
                )}

                

                
                
            </div>
        </div>
    );
}

export default BlogCard;