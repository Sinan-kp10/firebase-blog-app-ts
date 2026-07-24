import { BrowserRouter , Routes, Route } from "react-router-dom";
import Login from "../pages/Login";
import BlogList from "../pages/BlogList";
import AddEditBlog from "../pages/AddEditBlog";
import Signup from "../pages/Singnup";
import ProtectedRoute from "./ProtectedRoute";
import PublicRoute from "./PublicRoute";
import MainLayout from "../components/layout/MainLayout";
import MyBlogs from "../pages/MyBlogs";


const AppRouter = () => {
    return(
        <>
        
            <BrowserRouter>
                <Routes>
                    <Route element={<MainLayout />}><Route path="/" element={<BlogList />}></Route></Route>

                    <Route path="/my-blogs" element={ <ProtectedRoute> <MyBlogs /> </ProtectedRoute> }/>

                    <Route path="/blog/new" element={<ProtectedRoute><AddEditBlog /></ProtectedRoute>}></Route>
                    <Route path="/blog/edit/:id" element={<ProtectedRoute><AddEditBlog /></ProtectedRoute>}></Route>

                    <Route path="/Signup" element={<PublicRoute><Signup /></PublicRoute>}></Route>
                    <Route path="/login" element={<PublicRoute><Login /></PublicRoute>}></Route>

                    
                    

                </Routes>
            </BrowserRouter>
        
        </>
    )
}

export default AppRouter