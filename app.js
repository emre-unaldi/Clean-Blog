const express = require("express");
const app = express();
const mongoose = require("mongoose");
const ejs = require("ejs");
const path = require("path");
const methodOverride = require("method-override");
const Post = require("./models/Post");
const pageController = require("./controllers/pageController");
const postController = require("./controllers/postController");

//connect DB
mongoose
  .connect("mongodb://localhost/clean-blog", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("MongoDB Connected");
  })
  .catch((err) => {
    console.log(err);
  });

//TEMPLATE ENGINE
app.set("view engine", "ejs");

//MIDDLEWARES
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(
  methodOverride("_method", {
    methods: ["POST", "GET"],
  })
);

//ROUTES
app.get("/add_post", pageController.getAddPost);
app.get("/about", pageController.getAbout);
app.get("/post", pageController.getPost);
app.get("/posts/edit/:id", pageController.getEditPage);
app.post("/posts", postController.createPost);
app.get("/", postController.getAllPosts);
app.get("/posts/:id", postController.getPost);
app.put("/posts/:id", postController.updatePost);
app.delete("/posts/:id", postController.deletePost);

const port = 3000;
app.listen(port, () => {
  console.log(`The server is started on port ${port}.`);
});
