

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");
var _ = require("lodash");
const bcrypt = require("bcrypt");



const homeStartingContent = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
mongoose.connect("mongodb://127.0.0.1:27017/blogDB", {useNewUrlParser: true});
let posts = []
const itemsSchema = {
  postTitle: String,
  content: String
}
const Item = mongoose.model("Item", itemsSchema);

const dataSchema={
  fName:String,
  lName:String,
  email:String,
  password:String
}
const Data = mongoose.model("Data", dataSchema);


app.get("/", function(req,res){
  Item.find({}).then(function(posts){
    res.render("home", {para1:homeStartingContent, posts:posts})
  })
})

app.get("/signin", function(req,res){
  res.render("signin",{})
})
app.get("/register", function(req,res){
  res.render("register",{})
})

app.get("/about", function(req,res){
  res.render("about", {para2:aboutContent})
})

app.get("/contact", function(req,res){
  res.render("contact", {para3:contactContent})
})


app.get("/compose", function(req,res){
  res.render("compose")
  
})

app.post("/compose", function(req,res){
  const post = new Item({
    postTitle : req.body.postTitle,
    content : req.body.content
  })
  post.save();
  res.redirect("/");
})

app.post("/register", async function(req, res){
  //const hashedPassword= await bcrypt.hash(req.body.password, 10);
  const data = new Data({
    fName:req.body.fName,
    lName:req.body.lName,
    email:req.body.email,
    password:req.body.password
  })

  Data.insertMany([data])
 
  res.redirect("/signin");
})


app.post("/signin", async function(req, res){
  const email = req.body.email;
  const password = req.body.password;
  const userEmail = await Data.findOne({email:email})
  try{
    if(userEmail.password===password){
      res.redirect("/");
    }
    else{
      res.send("Wrong Password");
    }

  }
  catch{
    res.send("wrong details");
  }
  
})

app.get('/posts/:postId', (req, res) => {

  const requestedPostId = req.params.postId;
  Item.findOne({_id: requestedPostId}).then(function(post){

    res.render("post", {
 
      postTitle: post.postTitle,
 
      content: post.content
 
    });
 
  });
  // const requiredTitle = _.lowerCase(req.params.postName);
  // posts.forEach(function(post){
  //   const storedTitle =  _.lowerCase(post.postTitle);
  //   const storedContent = post.content;
    
  //   if(storedTitle === requiredTitle){
  //     res.render("post", {heading:storedTitle, para:storedContent})
  //   }
  // })

})
app.listen(3000, function() {
  console.log("Server started on port 3000");
});
