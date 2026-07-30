import { addDoc, getDoc, collection, doc, serverTimestamp, getDocs, orderBy, where, query, updateDoc, deleteDoc, limit, startAfter } from "firebase/firestore";
import { db } from "../firebase/firebase";
import type { QueryDocumentSnapshot, DocumentData } from "firebase/firestore";
import type { CreateBlogData } from "../types/blog";

export const createBlog = async (blog: CreateBlogData) => {
    const docRef = await addDoc(collection(db, "blogs"), {
        ...blog,
        createdAt: serverTimestamp()
    })

    return docRef.id
}

export const getAllBlogs = async (lastDoc?: QueryDocumentSnapshot<DocumentData>) => {
    const blogsRef = collection(db, "blogs");

    const q = lastDoc
        ? query(
            blogsRef,
            orderBy("createdAt", "desc"),
            startAfter(lastDoc),
            limit(7)
        )
        : query(
            blogsRef,
            orderBy("createdAt", "desc"),
            limit(7)
        );

    const querySnapshot = await getDocs(q);
    const hasNextPage = querySnapshot.docs.length > 6;
    const docs = querySnapshot.docs.slice(0, 6);

    const blogs = docs.map((doc) => {
        const data = doc.data();

        return {
            id: doc.id,
            title: data.title,
            content: data.content,
            authorId: data.authorId,
            authorName: data.authorName,
            createdAt: data.createdAt,
        };
    });

    const newLastDoc = docs.length > 0 ? docs[docs.length - 1] : null;

    return {
        blogs,
        lastDoc: newLastDoc,
        hasNextPage
    };
};

export const getBlogById = async (id: string) => {

    const docRef = doc(db, "blogs", id);

    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
        throw new Error("Blog not found");
    }

    const data = docSnap.data();

    return {
        id: docSnap.id,
        title: data.title,
        content: data.content,
        authorId: data.authorId,
        authorName: data.authorName,
        createdAt: data.createdAt,
    };
};


export const getUserBlogs = async (userId: string, lastDoc?: QueryDocumentSnapshot<DocumentData>) => {
    const blogsRef = collection(db, "blogs");

    const q = lastDoc
        ? query(
            blogsRef,
            where("authorId", "==", userId),
            orderBy("createdAt", "desc"),
            startAfter(lastDoc),
            limit(7)
        )
        : query(
            blogsRef,
            where("authorId", "==", userId),
            orderBy("createdAt", "desc"),
            limit(7)
        );

    const querySnapshot = await getDocs(q);
    const hasNextPage = querySnapshot.docs.length > 6;
    const docs = querySnapshot.docs.slice(0, 6);

    const blogs = docs.map((doc) => {
        const data = doc.data();

        return {
            id: doc.id,
            title: data.title,
            content: data.content,
            authorId: data.authorId,
            authorName: data.authorName,
            createdAt: data.createdAt,
        };
    });

    const newLastDoc = docs.length > 0 ? docs[docs.length - 1] : null;

    return {
        blogs,
        lastDoc: newLastDoc,
        hasNextPage
    };
};


export const updatingBlog = async (id: string, title: string, content: string) => {

    const blogRef = doc(db, "blogs", id)

    await updateDoc(blogRef, {
        title,
        content
    })
}

export const deleteBlog = async (id: string) => {
    const blogRef = doc(db, "blogs", id);

    await deleteDoc(blogRef);
};