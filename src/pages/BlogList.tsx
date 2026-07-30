import { useEffect, useState } from "react";
import { getAllBlogs } from "../services/blogService";
import type { Blog } from "../types/blog";
import BlogCard from "../components/blog/BlogCard";
import type { QueryDocumentSnapshot, DocumentData } from "firebase/firestore";
import "./bloglist.css";

const BlogList = () => {

    const [blogs, setBlogs] = useState<Blog[]>([])
    const [loading, setLoading] = useState(true)
    const [lastDoc, setLastDoc] = useState<QueryDocumentSnapshot<DocumentData> | null>(null)
    const [hasNextPage, setHasNextPage] = useState(false);
    const [prevCursors, setPrevCursors] = useState<(QueryDocumentSnapshot<DocumentData> | null)[]>([]);
    const [currentCursor, setCurrentCursor] = useState<QueryDocumentSnapshot<DocumentData> | null>(null);


    useEffect(() => {

        const fetchBlogs = async () => {

            try {

                const {blogs , lastDoc, hasNextPage} = await getAllBlogs()
                setBlogs(blogs)
                setLastDoc(lastDoc ?? null)
                setHasNextPage(hasNextPage);

            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false)
            }
        }

        fetchBlogs();
    }, [])

    const goToPage = async (pageNumber: number) => {
        const currentPage = prevCursors.length + 1;
        if (pageNumber === currentPage) return;

        try {
            setLoading(true);
            let data;
            let newPrevCursors = [...prevCursors];
            let newCurrentCursor = currentCursor;

            if (pageNumber === currentPage + 1) {
                if (!lastDoc) return;
                data = await getAllBlogs(lastDoc);
                newPrevCursors.push(currentCursor);
                newCurrentCursor = lastDoc;
            } else {
                const targetCursor = prevCursors[pageNumber - 1];
                data = await getAllBlogs(targetCursor || undefined);
                newPrevCursors = prevCursors.slice(0, pageNumber - 1);
                newCurrentCursor = targetCursor || null;
            }

            setPrevCursors(newPrevCursors);
            setCurrentCursor(newCurrentCursor);
            setBlogs(data.blogs);
            setLastDoc(data.lastDoc ?? null);
            setHasNextPage(data.hasNextPage);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const handleNext = () => {
        goToPage(prevCursors.length + 2);
    };

    const handlePrev = () => {
        goToPage(prevCursors.length);
    };

    if (loading) {
        return (
            <div className="blog-list-loading-container">
                <div className="loading-spinner"></div>
            </div>
        );
    }

    const currentPage = prevCursors.length + 1;
    const pageNumbers = [];
    for (let i = 1; i <= currentPage; i++) {
        pageNumbers.push(i);
    }
    if (hasNextPage) {
        pageNumbers.push(currentPage + 1);
    }

    return (

        <div className="blog-list-container">

            <h1 className="blog-list-title">All Blogs</h1>

            {blogs.length === 0 ? (
                <h3 className="no-blogs-message">No blogs found.</h3>
            ) : (
                <>
                    <div className="blog-grid">
                        {blogs.map((blog) => (
                            <BlogCard key={blog.id} blog={blog} />
                        ))}
                    </div>
                    <div className="pagination-wrapper">
                        <div className="pagination-bar">
                            <button 
                                className="pagination-btn-prev" 
                                onClick={handlePrev}
                                disabled={prevCursors.length === 0}
                            >
                                ‹ Previous
                            </button>
                            
                            <div className="pagination-pages">
                                {pageNumbers.map((page) => (
                                    <button
                                        key={page}
                                        className={`pagination-page-btn ${page === currentPage ? "active" : ""}`}
                                        onClick={() => goToPage(page)}
                                        disabled={page === currentPage}
                                    >
                                        {page}
                                    </button>
                                ))}
                            </div>

                            <button 
                                className="pagination-btn-next" 
                                onClick={handleNext}
                                disabled={!hasNextPage}
                            >
                                Next ›
                            </button>
                        </div>
                    </div>
                </>
            )}
        </div>

    )
}

export default BlogList;