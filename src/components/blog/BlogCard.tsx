import type { Blog } from "../../types/blog";
import { Link } from "react-router-dom";

type BlogCardProps = {
  blog: Blog;
};


const BlogCard = ({blog} : BlogCardProps) => {
    return (
        <div >

            <h2 >{blog.title}</h2>

            <p > By {blog.authorName} </p>

            <p >{blog.content}</p>

            <Link to={`/blog/edit/${blog.id}`}>
                    <button>Edit</button>
                </Link>
                <Link to={`/blog/delete/${blog.id}`}>
                    <button>Delete</button>
                </Link>
        </div>
  );
}

export default BlogCard;