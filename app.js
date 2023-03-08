//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");
const { Schema } = mongoose;
var _ = require("lodash");

let posts = [];
const homeStartingContent = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
mongoose.connect("mongodb://localhost:27017/blogDB", {useNewUrlParser: true});

const itemsSchema = new Schema({
  title: String,
  content: String
})
const Item = mongoose.model("Item", itemsSchema);

const item1 = new Item({
  title: "Day 1",
  content: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nisi incidunt itaque ducimus laudantium eveniet porro repudiandae illum autem iste ipsam ab magnam id in, iusto quia rerum. Inventore ipsum quam, consequuntur totam odio officiis. Et commodi inventore officia reiciendis? Modi, molestiae magnam. Quae debitis qui omnis quas cupiditate ea porro sit tempora sequi magnam odio eveniet voluptatum, consequatur nulla facere minima ut numquam, ratione quisquam. Deserunt magnam repellendus commodi alias, voluptatum praesentium. Libero optio quia sequi officiis, esse tenetur dicta saepe laboriosam hic explicabo, quod illo quasi adipisci sint quaerat ratione impedit necessitatibus inventore minus! Quis sit rem numquam? Ullam optio aliquid dolor quam porro corrupti minima distinctio necessitatibus in eos, veniam fuga iusto quod culpa, placeat vel dolores. Natus molestiae doloribus ipsa! Sint deserunt neque, non voluptas accusantium nostrum, recusandae enim facilis officiis soluta quis assumenda, tempora quo exercitationem suscipit necessitatibus eligendi odio rerum atque sed? Dolore quam totam adipisci, esse non labore magni quae harum molestias rem quibusdam voluptatem nemo in excepturi veritatis debitis suscipit ratione veniam. Voluptates laboriosam quos quia molestiae error rerum animi soluta ipsum unde veritatis, eius quas dolorem officia accusantium itaque voluptatibus adipisci dicta pariatur dolor eaque ex debitis. Maiores porro at eaque sit illo? Hic ipsa mollitia, praesentium molestias maxime illo sapiente id ipsam qui. Voluptatibus, doloribus itaque. Nisi error, corrupti labore placeat nulla recusandae ea consequuntur dicta quo dolores eveniet consectetur non ipsa voluptatem dolore reprehenderit maxime suscipit corporis! Laboriosam eligendi provident temporibus nisi, facere quam praesentium sed dolore, non qui alias voluptatum, ducimus enim minus blanditiis cum recusandae voluptatibus assumenda ut? Nam, perspiciatis soluta amet distinctio unde minima quos dolor aliquid, dignissimos omnis commodi corporis numquam voluptates labore? Quam rerum deserunt deleniti iure quaerat numquam perspiciatis incidunt doloribus debitis! Delectus optio, odio eligendi, eum dolorum laboriosam odit nisi id necessitatibus, voluptatem exercitationem consequuntur. Eveniet ipsam molestias quae error nisi optio ab labore harum, provident temporibus modi voluptatem ex illo, nihil voluptatum ea voluptates sit voluptate. Enim nemo odit amet voluptate, iste earum explicabo accusantium error aliquid quod veritatis magni at similique dicta quos fugiat ipsam deserunt doloribus blanditiis quis consequatur quam eveniet cum quibusdam! Molestiae quis sit enim officiis labore atque delectus ipsa voluptate assumenda dolorem, deserunt, voluptates quia aspernatur consectetur provident beatae accusantium odit. Vel aut, consectetur laborum perferendis inventore sequi eius! Corrupti reprehenderit deleniti dolores sapiente doloribus. Vero hic exercitationem assumenda quidem esse eaque alias adipisci delectus, est molestias."
})



app.get("/", function(req,res){
  res.render("home", {para1:homeStartingContent, posts:posts})
  
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


app.get('/posts/:postName', (req, res) => {
  const requiredTitle = _.lowerCase(req.params.postName);
  posts.forEach(function(post){
    const storedTitle =  _.lowerCase(post.postTitle);
    const storedContent = post.content;
    
    if(storedTitle === requiredTitle){
      res.render("post", {heading:storedTitle, para:storedContent})
    }
  })

})
app.listen(3000, function() {
  console.log("Server started on port 3000");
});
