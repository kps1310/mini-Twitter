const routes = require("express").Router();
const {
  createPost,
  getAllPosts,
  deletePost,
  getOnePost,
  addToLikedPost,
  removeFromLikedPost,
  postsforTimeline
} = require("../controller/Posts");

routes.get("/", getAllPosts);

routes.get("/:id", getOnePost);

routes.get("/timeline/all", postsforTimeline);

routes.post("/like/", addToLikedPost);

routes.post("/unlike/", removeFromLikedPost);

routes.post("/", createPost);

// This won't delete the posts

routes.delete("/:id", deletePost);

module.exports = routes;
