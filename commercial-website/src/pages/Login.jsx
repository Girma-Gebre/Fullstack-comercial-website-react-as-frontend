import { useNavigate } from "react-router-dom";
import { useState } from "react";
export default function Login({onLogin}) {
const navigate = useNavigate();

// the old code
/* const handleLogin = () => {
onLogin(); //props imported from App.js
navigate('/');
}; */

// the start of login
 // data input handling
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: ""
  });

  //response message hanlding
    const [message, setMessage] = useState({Msg: "", backgroundColor: "", color: "", display: "none"});

  // spinner handling
    const [spinner, setSpinner] = useState("none");
    
 // this function ebnable the input to take text from client 
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value }); // [name] indicates variable name and "...formData" handling the rest data when we enter the current single data
  };

  const handleLogin = async(e) => {
    e.preventDefault(); // to prevent the browser deafult action i.e reload while this function called
    setMessage({Msg: ""}); // making the message content empty when re-register
    setSpinner("block") // show spinner
   
       try {
     // use post method to link with the backend for local host
      const URL = "https://fullstack-comercial-website-react-as.onrender.com/login";
      const postMethodObject =  {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(formData)  // making the data sitring 
      };
        // post the data begin
      const send = await fetch(URL,postMethodObject)
      const data = await send.json();

      if(data.Msg === "User not found. Please signup."){
        setMessage({Msg: data.Msg, backgroundColor: "rgb(228, 83, 90)", color: "rgb(243, 3, 3)", display: "block"});

      } else if(data.Msg === "Incorrect password"){
         setMessage({Msg: data.Msg, backgroundColor: "rgb(228, 83, 90)", color: "rgb(243, 3, 3)", display: "block"});
      } else {
        alert("Login successful") // In the alert can't use variabe
        const token = data.token //this is security from the backend
        onLogin(token); //props imported from App.js
        navigate('/'); // navigate to home page after login successfully
      }
      
    } catch (error) {
      console.error("Error submitting data:", error);
    }finally{
      setSpinner("none") // hide spinner
    }
  };
//   the end of login  

return (
<div className="auth-container">
<h2>Login</h2>
<form onSubmit={handleLogin}>
   <label >
    <input name="fullName" value={formData.fullName} onChange={handleChange} type="text" placeholder="Full name" required/>
   </label>
   <label >
    <input name="email" value={formData.email} onChange={handleChange} type="email" placeholder="Email" required/>
   </label>
   <label >
    <input name="password" value={formData.password} onChange={handleChange} type="password" placeholder="Password" required/>
   </label>
   
<button type="submit">Login</button>
</form>
 <div className="spinner" style={{display: spinner}}></div>
<p style={{backgroundColor: message.backgroundColor, color: message.color, display: message.display, marginTop: "-12px", marginBottom: "-20px", borderRadius: "6px", width: "95%", marginLeft: "auto", marginRight: "auto"}}>{message.Msg} </p>
<p>Don't have an account? <span className="link" onClick={() => navigate('/signup')}>Sign Up</span></p>
</div>
);
}