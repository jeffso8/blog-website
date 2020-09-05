const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");

const app = express();

const randomtext = "In on announcing if of comparison pianoforte projection. Maids hoped gay yet bed asked blind dried point. On abroad danger likely regret twenty edward do. Too horrible consider followed may differed age. An rest if more five mr of. Age just her rank met down way. Attended required so in cheerful an. Domestic replying she resolved him for did. Rather in lasted no within no."
const aboutText =  "In on announcing if of comparison pianoforte projection. Maids hoped gay yet bed asked blind dried point. On abroad danger likely regret twenty edward do. Too horrible consider followed may differed age. An rest if more five mr of. Age just her rank met down way. Attended required so in cheerful an. Domestic replying she resolved him for did. Rather in lasted no within no."
const contactText = "In on announcing if of comparison pianoforte projection. Maids hoped gay yet bed asked blind dried point. On abroad danger likely regret twenty edward do. Too horrible consider followed may differed age. An rest if more five mr of. Age just her rank met down way. Attended required so in cheerful an. Domestic replying she resolved him for did. Rather in lasted no within no."

let publishText = [];
let publishTitle = [];

app.use(express.static("public"));

app.set('views', './views');
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
  extended: true
}));


app.get("/", function(req, res) {
  res.render("home", {
    pageTitle: "Home",
    homeContentTitle: publishTitle,
    homeStartingContent: publishText
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

app.post("/compose", function(req,res){
  let post = req.body.blogEntry;
  let title = req.body.postTitle;
  publishText.push(post);
  publishTitle.push(title);
  res.redirect("/");
})

app.listen(3000, function() {
  console.log("Server started on Port 3000");
});
