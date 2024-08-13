//imported packages
var express = require("express");
var mdb = require("mongoose");
var user = require("./models/userSchema.js");
var cors = require("cors"); //medium for travelling connecting FE and BE
var bodyParser = require("body-parser"); 

//connecting to the packages or calling the packages
var app = express();
mdb.connect("mongodb://localhost:27017/UserLogin");
var db = mdb.connection;
db.once("open", () => {
  console.log("Connected to MongoDB");
});

app.use(
  cors({
    origin: ["http://localhost:3000"],
    credentials: true,
    methods: ["GET", "POST"],
  })
);
app.use(bodyParser.json());

//signup store the details in db
app.post("/signup", (request, response) => {
  const { UserName, Email, FirstName, LastName, Password } = request.body;
  console.log(request.body);
  var newUser = new user({
    UserName: UserName,
    Email: Email,
    FirstName: FirstName,
    LastName: LastName,
    Password: Password,
  });
  newUser
    .save()
    .then(() => {
      response.json("Success")
    })
    .catch(()=>{
      response.json("Falied_to_SignUp")
    });
});

//signin check email and pass with db
app.post("/signin",async(request,response)=>{
  const {Email,Password} = request.body  //email pass coming from FE
  const User = await user.findOne({Email:Email}) || await user.findOne({UserName:Email}) // search for the user in collection "user"
  if(!User)
    {
      response.send("emailError") //send the response message to FE 
    }
    else{
    const userPass=User.Password
    if(userPass!==Password)
    {
      response.json("passwordError")
    }
    else if(userPass===Password){
      response.json("Success")
    }
  }
})

app.post("/emailcheck" ,async(request,response)=>{
  const{Email}=request.body
  const User = await user.findOne({Email:Email})
  if(User!==null)
  {
      response.json("emailCheck")
  }
  else{
      response.json("emailAccepted")
  }
})

app.post("/usernamecheck",async(request,response)=>{
  const {UserName}=request.body
  const User = await user.findOne({UserName:UserName})
  if(User!==null)
  {
      response.json("usernameCheck")
  }
  else{
      response.json("usernameAccepted")
  }
})

app.post("/getUser", async(request,response)=>{
  const loggedin=request.body
  const User=await user.findOne({UserName:loggedin.User}) || await user.findOne({Email:loggedin.User})
  response.json(User)
})

app.listen(3001, ()=>{
  console.log("Backend Server Initiated")}); //creating a local host and verifying sever status
