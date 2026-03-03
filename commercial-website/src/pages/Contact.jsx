import {useState} from 'react'
export default function Contact() {
      // data input handling
const [contactData, setContactData] = useState({
    fullName: "",
    email: "",
    message: ""
  });

//response message hanlding
    const [message, setMessage] = useState({Msg: "", backgroundColor: "", color: "", display: "none"});

  // spinner handling
    const [spinner, setSpinner] = useState("none");

   // this function ebnable the input to take text from client 
  const inputChange = (e) => {
    const { name, value } = e.target;
    setContactData({ ...contactData, [name]: value }); // [name] indicates variable name and "...contactData" handling the rest data when we enter the current single data
  }; 
   //   submitHandling 
   const inputSubmit = async(e) => {
    e.preventDefault(); // to prevent the browser deafult action i.e reload while this function called

    setMessage({Msg: "", backgroundColor: "", color: "", display: "none"}); // making the message content empty when re-register
      setSpinner("block") // show spinner
   
       try {
     // use post method to link with the backend
      const URL = "https://comercial-webaite-fullstack-latest.onrender.com/submit"; // ------For local server-----
      const postMethodObject = {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(contactData)  // making the data sitring 
      };
        // post the data begin
      const send = await fetch(URL,postMethodObject)
      const data = await send.json();

      if(data.Msg === "Your data are recorded successfully"){
        setMessage({Msg: data.Msg, backgroundColor: "#a1e6b0ff", color: "#0bbe38ff", display: "block"});

      // reset the input
      setContactData({
      fullName: "",
      email: "",
      message: ""
       });
      }else {
        setMessage({ Msg: data.Msg, backgroundColor: "#eeb7b7ff", color: "#e61919ff", display: "block"});
      }
      
    } catch (error) {
      console.error("Error submitting data:", error);
    }finally{
      setSpinner("none") // hide spinner
    }
  };
return (
<div >
<form className="contact-box" onSubmit={inputSubmit}>
<input type="text" placeholder="Full Name" name="fullName" value={contactData.fullName}
            onChange={inputChange} required/>
<input type="email" placeholder="Email" name="email" value={contactData.email}
            onChange={inputChange} required/>
<textarea rows="4" placeholder="Send your message" name="message"  value={contactData.message}
            onChange={inputChange} required></textarea>
<button type="submit">Send Message</button>
</form>
 <div className="spinner" style={{display: spinner}}></div>
 <p className="success-message" style={{backgroundColor: message.backgroundColor, color: message.color, display: message.display}}>{message.Msg}</p>
</div>
);
}