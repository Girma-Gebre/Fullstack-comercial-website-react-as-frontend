import { useNavigate } from "react-router-dom";
import React, { useState} from "react";
export default function SignUp({onSignUp}) {
    const navigate = useNavigate();
    // data input handling
const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: ""
  });

   // spinner handling
    const [spinner, setSpinner] = useState("none");
     //response message hanlding
    const [message, setMessage] = useState({Msg: "", backgroundColor: "", color: "", display: "none"});

        // this function ebnable the input to take text from client 
  const inputChange = (e) => { 
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value }); // [name] indicates variable name and "...contactData" handling the rest data when we enter the current single data
  }; 

  //   signUpHandling 
   const signUpHandling = async(e) => {
    e.preventDefault(); // to prevent the browser deafult action i.e reload while this function called

     setSpinner("block") // show spinner
   
       try {
     // use post method to link with the backend
      const URL = "https://fullstack-comercial-website-react-as.onrender.com/signup"; // ------For local server-----
      const postMethodObject =  {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(formData)  // making the data sitring 
      };
        // post the data begin
      const send = await fetch(URL,postMethodObject)
      const data = await send.json();

      if(data.Msg === "Email already exists"){
      // reset the input
       setMessage({Msg: data.Msg, backgroundColor: "rgb(228, 83, 90)", color: "rgb(243, 3, 3)", display: "block"});
      } else{
        alert("Signup successful")
        const token = data.token // this is security from the backend
        onSignUp(token); //props imported from App.js
        navigate('/'); // navigate to home page after login successfully

      }

    } catch (error) {
      console.error("Error in logging:", error);
    }finally{
      setSpinner("none") // hide spinner
    }
  };
return (
<form onSubmit={signUpHandling} className="auth-container">
<h2>Sign Up</h2>
<input type="text" placeholder="Full Name" name ="fullName" onChange={inputChange} value={formData.fullName} required/>
<input type="email" placeholder="Email" name="email" onChange={inputChange} value={formData.email} required/>
<input type="password" placeholder="Password" name="password" onChange={inputChange} value={formData.password} required/>
<button type="submit" >Sign Up</button>
 <div className="spinner" style={{display: spinner}}></div>
<p style={{backgroundColor: message.backgroundColor, color: message.color, display: message.display, marginTop: "-12px", marginBottom: "-20px", borderRadius: "6px", width: "95%", marginLeft: "auto", marginRight: "auto"}}>{message.Msg}</p>
<p>Already have an account? <span className="link" onClick={() => navigate('/login')}>Login</span></p>
</form>
);
}