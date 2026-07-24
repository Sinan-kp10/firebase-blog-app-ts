# 📝 Blogify — Modern Blog Posting Application

Blogify is a sleek, responsive, and high-fidelity blogging application built using **React**, **TypeScript**, **Vite**, and **Firebase**. The application features email-based authentication, user-specific dashboards, custom popups, and a polished responsive design system built entirely with vanilla CSS.


visit : https://blog-posting-app-delta.vercel.app/

---

## 🌟 Key Features

* **🔐 Firebase Authentication**: Secure user Sign-In and Sign-Up flows using Firebase Auth.
* **🏠 Global Home Feed**: Displays all published blogs with responsive grid cards featuring card elevations on hover.
* **📂 Personal Dashboard (My Blogs)**: A dedicated workspace for users to manage their own blog posts, review their publishing dates, and trigger actions.
* **📝 Dynamic Blog Publisher**: An unified card-based interface for publishing new blogs and editing existing ones, featuring client-side form validation via React Hook Form and Zod.
* **🗑️ Custom Delete Modal**: A custom animated modal overlay that acts as a stateful confirmation dialog before deleting posts, replacing basic browser default popups.
* **🧭 Glassmorphic Sticky Navbar**: Translucent layout navbar using `backdrop-filter: blur(12px)` that remains sticky at the top, grouping control links neatly based on authentication state.
* **📱 Responsive Design**: Fully responsive styling, utilizing flexible flex-grids, mobile-first ordering, and layout adjustments for mobile, tablet, and desktop screens.
* **🔄 Custom Loaders**: Beautiful, rotating CSS spinners for auth loading states and list fetches, placed globally to prevent layout shifts.

---

## 🛠️ Technology Stack

* **Core**: React 18, TypeScript, Vite
* **Routing**: React Router DOM (v6)
* **Forms & Validation**: React Hook Form, Zod Resolver (Zod schema checking)
* **Backend Services**: Firebase Authentication, Cloud Firestore NoSQL Database
* **Toasts**: React Toastify (success/error alerts)
* **Styling**: Vanilla CSS (Custom design systems, transitions, and cubic-bezier micro-animations)

---

## 📁 Folder Structure

```text
blog-posting-app/
├── public/                 # Static assets
└── src/
    ├── components/
    │   ├── blog/           # BlogCard and DeleteModal components and CSS
    │   └── layout/         # MainLayout and Navbar components and CSS
    ├── context/            # AuthContext and AuthProvider session states
    ├── firebase/           # Firebase initialization config
    ├── hooks/              # Custom useAuth consumer hook
    ├── pages/              # Routing pages (BlogList, MyBlogs, AddEditBlog, Login, Signup)
    ├── routes/             # AppRouter configuration and ProtectedRoute wrappers
    ├── services/           # Firestore query operations and authService wrappers
    ├── types/              # TypeScript interface definitions (Blog, User)
    └── validation/         # Zod schemas (blogSchema, authSchema)
```

---

## 🚀 Getting Started

### 1. Prerequisites
Ensure you have **Node.js** (v18+) and **npm** installed.

### 2. Installation
Clone this repository to your local system and navigate to the project directory:
```bash
npm install
```

### 3. Firebase Configuration
Create a Firestore database and Auth configuration. Then initialize it in `src/firebase/firebase.ts` matching the following configuration:
```typescript
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
```

### 4. Running Locally
Start the local Vite development server:
```bash
npm run dev
```
Open your browser and navigate to `http://localhost:5173`.

### 5. Building for Production
To build the application and compile the static bundle for hosting:
```bash
npm run build
```
The compiled output will be generated inside the `dist/` directory.

---

## 📄 License
This project is open-source and available under the MIT License.
