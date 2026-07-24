import { addDoc, getDoc, collection, doc, serverTimestamp , getDocs, orderBy,  where, query, updateDoc} from "firebase/firestore";
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


export const getUserBlogs = async (userId: string) => {
    const q = query(
        collection(db, "blogs"),
        where("authorId", "==", userId),
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


export const updatingBlog = async(id : string, title : string, content : string) =>{

    const blogRef = doc(db,"blogs",id)

    await updateDoc(blogRef, {
        title,
        content
    })
}