import { Routes, Route, Navigate } from "react-router-dom";
import { useState } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Home from "./pages/Home";
import About from "./pages/About";
import Products from "./pages/Products";
import Pricing from "./pages/Pricing";
import Contact from "./pages/Contact";


// Simple auth simulation
const isAuthenticated = () => {
  return Boolean(localStorage.getItem("token"));
};

export default function App() {
   // this is the old one
    const [auth, setAuth] = useState(isAuthenticated) // to enable the react re-direct or refreash
    const onloginOrSignUp = (token)=>{
        localStorage.setItem('token', token)
        setAuth(true)
    }
    const logout = ()=>{
        localStorage.removeItem('token');
        setAuth(false)
    }
  
return (
<>
{auth && <Navbar signOut = {logout}/>}

<main>
<Routes>
<Route path="/" element={auth ? <Home /> : <Navigate to="/login" />} />
<Route path="/login" element={<Login  onLogin = {onloginOrSignUp}/>} />
<Route path="/signup" element={<SignUp onSignUp = {onloginOrSignUp}/>} />
<Route path="/about" element={auth ? <About /> : <Navigate to="/login" />} />
<Route path="/products" element={auth ? <Products /> : <Navigate to="/login" />} />
<Route path="/pricing" element={auth ? <Pricing /> : <Navigate to="/login" />} />
<Route path="/contact" element={auth ? <Contact /> : <Navigate to="/login" />} />
</Routes>
</main>

 {auth && <Footer />} 
</>
);
}