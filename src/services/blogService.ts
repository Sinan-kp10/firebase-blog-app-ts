import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { getDocs, orderBy, query } from "firebase/firestore";
import { db } from "../firebase/firebase";
import type { CreateBlogData } from "../types/blog";

export const createBlog = async (blog : CreateBlogData) => {
    const docRef = await addDoc(collection(db,"blogs"), {
        ...blog,
        createdAt: serverTimestamp()
    })

    return docRef.id
}

export const getAllBlogs = async () => {
    const q = query(
        collection(db, "blogs"),
        orderBy("createdAt", "desc")
    );

    const querySnapshot = await getDocs(q);

    return querySnapshot.docs.map((doc) => {
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
};