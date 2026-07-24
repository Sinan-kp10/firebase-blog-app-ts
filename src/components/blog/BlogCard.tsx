import type { Blog } from "../../types/blog";

type BlogCardProps = {
  blog: Blog;
};


const BlogCard = ({blog} : BlogCardProps) => {
    return (
    <div >
      <h2 >
        {blog.title}
      </h2>

      <p >
        By {blog.authorName}
      </p>

      <p >
        {blog.content}
      </p>
    </div>
  );
}

export default BlogCard;