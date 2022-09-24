const Post = require("../models/Post");

exports.getAddPost = (req, res) => {
  res.render("add_post");
};

exports.getAbout = (req, res) => {
  res.render("about");
};

exports.getPost = (req, res) => {
  res.render("post");
};

exports.getEditPage = async (req, res) => {
  const post = await Post.findOne({ _id: req.params.id });
  res.render("edit", {
    post,
  });
};
