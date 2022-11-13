//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const ejs = require("ejs");
const _ =require("lodash");



const aboutContent = "This is a basic Blog website in which User can Publish there blogs and can also delete their blog.";
const contactContent = "Hello";

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));


mongoose.connect("mongodb+srv://priyanshu:68760102@cluster0.bqdvfdm.mongodb.net/blogDB", {useNewUrlParser: true});
const blogSchema = {
  title_of_blog: String,
  content_of_blog: String
};

const Blog = mongoose.model("Blog", blogSchema);




app.get("/", function(req, res){

  Blog.find({}, function(err, foundItems){
      
      res.render("home",{blogs: foundItems});

  });


})
app.get("/about", function(req, res){
  res.render("about",{aboutContent:aboutContent})
})
app.get("/contact", function(req, res){
  res.render("contact",{contactContent:contactContent})
})
app.get("/compose", function(req, res){
  res.render("compose");
})
app.post("/compose", function(req, res){
  var content= req.body.content;
  var title = req.body.title;
  var blog2 = new Blog({
    title_of_blog: title,
    content_of_blog: content
  })
  blog2.save();
  res.redirect("/");
})

app.get("/post/:postName", function(req, res){
  var param_value = _.lowerCase(req.params.postName);

  Blog.find({},function(err, foundItems){

      for(var i = 0; i<foundItems.length; i++){

        var blog_name = _.lowerCase(foundItems[i].title_of_blog);
        if(blog_name === param_value){
              res.render("post", {title: foundItems[i].title_of_blog, content: foundItems[i].content_of_blog});
          }

      }
  })


})


app.post("/delete", function(req, res){
  console.log("hi");
  console.log(req.body);

  const delete_id = req.body.toBeDeleted;
  Blog.findByIdAndDelete(delete_id, function(err){
    if(err){
      console.log(err);
    }
    else{
      console.log("successfully deleted");
      res.redirect("/");
    }
  })

})











let port = process.env.PORT;
if(port == null || post == ""){
  port = 8000;
}


app.listen(port, function() {
  console.log("Server started on port 8000");
});
