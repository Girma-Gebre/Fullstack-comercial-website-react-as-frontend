const express = require("express");
const mongoose = require('mongoose'); 
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")
const router = express.Router();
const Autoincrement = require("mongoose-sequence")(mongoose); // import the autoincrement as-built module
// connect the server (node Js) with mongoDB atlas
mongoose.connect(process.env.MONGO_URL, {family: 4}) 
.then(()=>console.log("Conneted to MongoDB Atlas"))
.catch(err=>console.error('Connection failed', err))   

// schema for SignUp
const singUpSchema = new mongoose.Schema({
    fullName: {type: String, required: true},
    email: {type: String, required: true, unique: true}, 
    password: {type: String, required: true}           
}); 
 //---------insert "User_id" field and make autoincrement for each data inserted from client/fromtend-------
//--------inc_field is plugin expexted object key
// ---- Always apply the plugin before creating the model:
singUpSchema.plugin(Autoincrement, {inc_field: "singUpId"}); 
// creating "signInsingUpData" collection in the mongodb and class for creating an instance object template(data from client e.g: req.body).
const singUp = mongoose.model("singUpData", singUpSchema); 

// making the userId to be set 1 and autoincrement if there is no documnet in the collection
async function resetSignUpIfEmpty() { 
  const count = await singUp.countDocuments(); // this shows the value of seq in counters collection in mongodb, it indicates the heighest "UserId" or the number of documents in the "signUpDatas" collection in mongoDB database
  if (count === 0) {
    // Reset the counter for "UserId"
    await mongoose.connection.collection("counters").updateOne( // _counters default mongoose can know
      { _id: `${singUp.collection.name}_singUp` }, // <-- must match collection name + field exactly
      { $set: { seq: 0 } },
      { upsert: true } // insert if it is not exist update if it is exixt
    );
  }
} 

//----------routing start for signUp-----------------
router.post('/signup', async (req,res)=>{
  try{
    const fullNameNoExtraSpace = req.body.fullName.trim().replace(/\s+/g, " ") //avoiding extra space from name from client/frontend  
    const {email, password} = req.body; 
    const existUser = await singUp.findOne({email}); 

   // Check if email exists
      if(existUser){
       return res.json({ Msg: "Email already exists" });
      }

       // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    const newSingUp = new singUp({
      fullName: fullNameNoExtraSpace,
      email,
      password: hashedPassword
    });

    await newSingUp.save();

      // Create JWT token
    const token = jwt.sign(
      { id: existUser._id, email: existUser.email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(201).json({ Msg: "Signup successful", token});
    
       // Reset counter (only when no data exist)
        await resetSignUpIfEmpty() //calling the function to reset the "UserId"
      
    }catch(err){
        res.status(500).json({Msg: "Server error"});
    }
  
})
//---------------routing end for signUp---------------------


// --------------routing start for Login----------------
router.post("/login", async (req,res)=>{
    try{
    
    const {email, password} = req.body; 
    const existUser = await singUp.findOne({email}); 

       // check the email is already logined in or not
      if(!existUser){
       return res.json({ Msg: "User not found. Please signup." });
      }
  // Compare (check) password
    const isMatch = await bcrypt.compare(password, existUser.password);

    if (!isMatch) {
      return res.json({ Msg: "Incorrect password" });
    }

     // Create JWT token
    const token = jwt.sign(
      { id: existUser._id, email: existUser.email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );
     res.json({Msg: "Login successful", token});
    }catch(err){
         res.status(500).json({ Msg: "Server error" });
    }
});
// -------------- end for Login-----------------

// create shema for client normal data
const clientDataSchema = new mongoose.Schema({
    fullName: {type: String, required: true},
    email: {type: String, required: true, unique: true}, 
    message: {type: String, required: true}           
});  

 //---------insert "User_id" field and make autoincrement for each data inserted from client/fromtend-------
//--------inc_field is plugin expected object key
// ---- Always apply the plugin before creating the model:
clientDataSchema.plugin(Autoincrement, {inc_field: "clientDataSchemaId"}); 
// creating "commercialWeb" collection in the mongodb and class for creating an instance object template(data from client e.g: req.body).
const clientData = mongoose.model("clientData", clientDataSchema); 

// making the userId to be set 1 and autoincrement if there is no documnet in the collection
async function resetclientDataIfEmpty() { 
  const count = await clientData.countDocuments(); // this shows the value of seq in counters collection in mongodb, it indicates the heighest "UserId" or the number of documents in the "commercialWebs" collection in mongoDB database
  if (count === 0) {
    // Reset the counter for "UserId"
    await mongoose.connection.collection("counters").updateOne( // _counters default mongoose can know
      { _id: `${clientData.collection.name}_clientDataSchemaId` }, // <-- must match collection name + field exactly
      { $set: { seq: 0 } },
      { upsert: true } // insert if it is not exist update if it is exixt
    );
  }
} 

router.post("/submit", async (req,res)=>{
    try{
    const fullNameNoExtraSpace = req.body.fullName.trim().replace(/\s+/g, " ") //avoiding extra space from name from client/frontend  
    const {email, message} = req.body;

    const existData = await clientData.findOne({email}); // if the document is not exist ( no data) then the value of existData is "null"
      if(existData){
          return res.json({Msg: "The email you entered already exists!"})
        }
      // create an instance object template from class and insert data from client e.g: req.body
        const newClientData = new clientData({fullName: fullNameNoExtraSpace, email, message}); // creating object from class
       await newClientData.save(); // enable the data to save by mongoose and send to mongoDB as BJSON data type.
        res.status(200).json({ Msg: "Your data are recorded successfully" }); // ✅send JSON this is manadatory to work the front end correctly nice!
         // Reset counter (only when no data exist)
        await resetclientDataIfEmpty() //calling the function to reset the "UserId"
    }catch(err){
        res.status(500).json({Msg: "Internal server error"});
    }
});

module.exports = router;  