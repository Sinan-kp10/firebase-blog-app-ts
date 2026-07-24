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
    )
    const querySnapshot = await getDocs(q)

    return querySnapshot.docs.map((doc) => ({
        id : doc.id,
        ...doc.data()
    }))
}