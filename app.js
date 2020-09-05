const express = require("express");
const bodyParser = require("body-parser");
const _ = require("lodash");
const ejs = require("ejs");

const app = express();

const randomtext = "In on announcing if of comparison pianoforte projection. Maids hoped gay yet bed asked blind dried point. On abroad danger likely regret twenty edward do. Too horrible consider followed may differed age. An rest if more five mr of. Age just her rank met down way. Attended required so in cheerful an. Domestic replying she resolved him for did. Rather in lasted no within no."
const aboutText = "In on announcing if of comparison pianoforte projection. Maids hoped gay yet bed asked blind dried point. On abroad danger likely regret twenty edward do. Too horrible consider followed may differed age. An rest if more five mr of. Age just her rank met down way. Attended required so in cheerful an. Domestic replying she resolved him for did. Rather in lasted no within no."
const contactText = "In on announcing if of comparison pianoforte projection. Maids hoped gay yet bed asked blind dried point. On abroad danger likely regret twenty edward do. Too horrible consider followed may differed age. An rest if more five mr of. Age just her rank met down way. Attended required so in cheerful an. Domestic replying she resolved him for did. Rather in lasted no within no."

let posts = [];

app.use(express.static("public"));

app.set('views', './views');
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
  extended: true
}));


app.get("/", function(req, res) {
  res.render("home", {
    pageTitle: "Home",
    posts: posts,
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
  let post = {
    title: req.body.postTitle,
    content: req.body.blogEntry
  }
  posts.push(post);

  res.redirect("/");
});

app.get("/posts/:postName", function(req, res) {
  let requestedTitle = req.params.postName;
  posts.forEach(function(post) {
    if (_.lowerCase(post.title) === _.lowerCase(requestedTitle)) {
      res.render("post", {
        pageTitle: post.title,
        postContent: post.content,
      });
    };
  });
});

app.listen(3000, function() {
  console.log("Server started on Port 3000");
});
