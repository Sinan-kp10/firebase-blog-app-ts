import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import "react-toastify/dist/ReactToastify.css";
import { AuthProvider } from "./context/AuthProvider.tsx";

createRoot(document.getElementById('root')!).render(
    <AuthProvider>
    <App />
  </AuthProvider>
)
