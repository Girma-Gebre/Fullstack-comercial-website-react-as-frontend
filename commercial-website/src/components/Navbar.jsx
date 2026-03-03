import { Link,useNavigate } from "react-router-dom";
import { useState } from "react";


export default function Navbar({signOut}) {
const [open, setOpen] = useState(false);
 const navigate = useNavigate();
    const logout = ()=>{
        signOut();
        navigate('/login')
    }

return (
<nav className="navbar">
<h1 className="logo"><a style={{textDecoration:"none", color: 'white', width: "100%", height:"100%", display: "block"}} href="https://comercial-webaite-fullstack-latest.onrender.com/">💼<br/>CodingService</a></h1> {/*backend home page*/}
<button className="menu-btn" onClick={() => setOpen(!open)}>☰</button>
<ul className={open ? "nav-links open" : "nav-links"}>
<li><Link to="/">Home</Link></li>
<li><Link to="/about">About</Link></li>
<li><Link to="/products">Products</Link></li>
<li><Link to="/pricing">Pricing</Link></li>
<li><Link to="/contact">Contact</Link></li>
</ul>
<button className="logOut" style={{padding: "8px", font: "20px", fontWeight:"bold", borderRadius: "6px"}} onClick={logout}>Log out</button>
</nav>
);
}