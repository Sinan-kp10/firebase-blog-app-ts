import { BrowserRouter , Routes, Route } from "react-router-dom";

import Login from "../pages/Login";
import BlogList from "../pages/BlogList";
import AddEditBlog from "../pages/AddEditBlog";
import Signup from "../pages/Singnup";


const AppRouter = () => {
    return(
        <>
        
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<BlogList />}></Route>
                    <Route path="/Signup" element={<Signup />}></Route>
                    <Route path="/login" element={<Login />}></Route>
                    <Route path="/blog/new" element={<AddEditBlog />}></Route>
                    <Route path="/blog/edit/:id" element={<AddEditBlog />}></Route>
                    

                </Routes>
            </BrowserRouter>
        
        </>
    )
}

export default AppRouter