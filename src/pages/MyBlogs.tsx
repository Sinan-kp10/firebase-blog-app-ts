import { useEffect, useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { getUserBlogs } from "../services/blogService";
import type { Blog } from "../types/blog";
import BlogCard from "../components/blog/BlogCard";
import { deleteBlog } from "../services/blogService";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import DeleteModal from "../components/blog/DeleteModal";
import type { QueryDocumentSnapshot, DocumentData } from "firebase/firestore";
import "./myblogs.css";



const MyBlogs = () => {

    const [blogs, setBlogs] = useState<Blog[]>([])
    const [loading, setLoading] = useState(true)
    const { user } = useAuth()
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [blogToDelete, setBlogToDelete] = useState<string | null>(null)
    const [lastDoc, setLastDoc] = useState<QueryDocumentSnapshot<DocumentData> | null>(null)
    const [hasNextPage, setHasNextPage] = useState(false)
    const [prevCursors, setPrevCursors] = useState<(QueryDocumentSnapshot<DocumentData> | null)[]>([]);
    const [currentCursor, setCurrentCursor] = useState<QueryDocumentSnapshot<DocumentData> | null>(null);


    const handleDeleteClick = (id: string) => {
        setBlogToDelete(id);
        setIsModalOpen(true);
    };

    const handleConfirmDelete = async () => {
        if (!blogToDelete) return;
        try {
            await deleteBlog(blogToDelete);
            setBlogs((prevBlogs) => prevBlogs.filter((blog) => blog.id !== blogToDelete));
            toast.success("Blog deleted successfully.");
        } catch (error) {
            console.error(error);
            toast.error("Failed to delete blog.");
        } finally {
            setIsModalOpen(false);
            setBlogToDelete(null);
        }
    }

    useEffect(() => {

        if (!user) return
        const fetchBlogs = async () => {

            try {

                const data = await getUserBlogs(user.uid)
                setBlogs(data.blogs)
                setLastDoc(data.lastDoc ?? null)
                setHasNextPage(data.hasNextPage)

            } catch (error) {
                console.log(error)
            } finally {
                setLoading(false);
            }
        }
        fetchBlogs()

    }, [user])

    const goToPage = async (pageNumber: number) => {
        if (!user) return;
        const currentPage = prevCursors.length + 1;
        if (pageNumber === currentPage) return;

        try {
            setLoading(true);
            let data;
            let newPrevCursors = [...prevCursors];
            let newCurrentCursor = currentCursor;

            if (pageNumber === currentPage + 1) {
                if (!user || !lastDoc) return;
                data = await getUserBlogs(user.uid, lastDoc);
                newPrevCursors.push(currentCursor);
                newCurrentCursor = lastDoc;
            } else {
                const targetCursor = prevCursors[pageNumber - 1];
                data = await getUserBlogs(user.uid, targetCursor || undefined);
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

        <div className="my-blogs-container">
            <Link to="/" className="back-to-home">
                <span className="back-icon">←</span> Back to Home
            </Link>
            <h1 className="my-blogs-title">My Blogs</h1>

            {blogs.length === 0 ? (
                <p className="no-blogs-message">No blogs found.</p>
            ) : (
                <>
                    <div className="my-blogs-grid">
                        {blogs.map((blog) => (
                            <BlogCard key={blog.id} blog={blog} showActions onDelete={handleDeleteClick} />
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

            <DeleteModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onConfirm={handleConfirmDelete}
            />
        </div>
    )

};

export default MyBlogs;