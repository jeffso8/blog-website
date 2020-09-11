const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const _ = require("lodash");
const ejs = require("ejs");

const app = express();

const randomtext = "In on announcing if of comparison pianoforte projection. Maids hoped gay yet bed asked blind dried point. On abroad danger likely regret twenty edward do. Too horrible consider followed may differed age. An rest if more five mr of. Age just her rank met down way. Attended required so in cheerful an. Domestic replying she resolved him for did. Rather in lasted no within no."
const aboutText = "In on announcing if of comparison pianoforte projection. Maids hoped gay yet bed asked blind dried point. On abroad danger likely regret twenty edward do. Too horrible consider followed may differed age. An rest if more five mr of. Age just her rank met down way. Attended required so in cheerful an. Domestic replying she resolved him for did. Rather in lasted no within no."
const contactText = "In on announcing if of comparison pianoforte projection. Maids hoped gay yet bed asked blind dried point. On abroad danger likely regret twenty edward do. Too horrible consider followed may differed age. An rest if more five mr of. Age just her rank met down way. Attended required so in cheerful an. Domestic replying she resolved him for did. Rather in lasted no within no."


app.use(express.static("public"));

app.set('views', './views');
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
  extended: true
}));

mongoose.connect("mongodb://localhost:27017/blogDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const postSchema = new mongoose.Schema({
  title: String,
  content: String
});

const Post = mongoose.model("Post", postSchema);

const test = new Post ({
  title: "Hello",
  content: "hello world"
});

test.save();


app.get("/", function(req, res) {

  Post.find({}, function(err, posts) {
    if (posts.length === 0) {
      res.render("home", {
        pageTitle: "Home",
        posts: "posts"
      })
    }
    res.render("home", {
      pageTitle: "Home",
      posts: posts,
    });
  });
});

app.get("/about", function(req, res) {
  res.render("about", {
    pageTitle: "About",
    aboutStartingContent: aboutText
  });
});

app.get("/contact", function(req, res) {
  res.render("contact", {
    pageTitle: "Contact Me",
    contactStartingContent: contactText
  });
});

app.get("/compose", function(req, res) {
  res.render("compose", {
    pageTitle: "Compose",
  });
});

app.post("/compose", function(req, res) {
  console.log(req);
  console.log(res);
  const post = new Post ({
    title: req.body.postTitle,
    content: req.body.blogEntry
  });

  post.save(function(err){
    if (!err){
      res.redirect("/");
    }
    console.log(err);
  });
});

app.get("/posts/:postId", function(req, res) {
  const requestedPostId = req.params.postId;
  Post.findOne({_id: requestedPostId}, function(err, post){
      res.render("post", {
        pageTitle: post.title,
        postContent: post.content,
      });
    });
  });

app.listen(3000, function() {
  console.log("Server started on Port 3000");
});
