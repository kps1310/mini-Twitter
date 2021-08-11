const PostModel = require("../models/Post.model");
const UserModel = require("../models/User.model");

exports.createPost = (req, res) => {
  UserModel.findById(req.decode.id)
    .then(user => {
      if (!user) {
        return res.status(403).send("Error: something wrong here...");
      }

      PostModel.create({
        content: req.body.content,
        owner: user._id,
        ownerName: user.username,
        profilePic: user.profilePic
      })
        .then(post => {
          res.json(post);
        })
        .catch(e => {
          res.status(500).send("Error in server");
        });
    })
    .catch(e => {
      res.status(500).send("Error: failed to verify username");
    });
};

exports.getAllPosts = (req, res) => {
  UserModel.findById(req.decode.id)
    .then(user => {
      PostModel.find()
        .then(posts =>
          res.json(
            posts
              .map(post => {
                const checker = post._doc.likedBy.some(e => {
                  return e.toString() == user._id.toString();
                });
                if (checker) {
                  return {
                    ...post._doc,
                    liked: true
                  };
                } else {
                  return {
                    ...post._doc,
                    liked: false
                  };
                }
              })
              .reverse()
          )
        )
        .catch(e => {
          res.status(500).send("Something wrong in the server");
        });
    })
    .catch(e => res.status(403).send("Error: failed to verify username"));
};

exports.deletePost = (req, res) => {
  UserModel.findById(req.decode.id)
    .then(user => {
      if (!user) {
        return res.status(403).send("Error: something wrong here...");
      }
      PostModel.findByIdAndRemove(req.params.id)
        .then(post => {
          res.json({ message: "Success deleting post" });
        })
        .catch(e => {
          res.status(500).send("Something is wrong");
        });
    })
    .catch(e => res.status(403).send("Error: failed to verify username"));
};

exports.getOnePost = (req, res) => {
  UserModel.findById(req.decode.id)
    .then(user => {
      if (!user) {
        return res.status(403).send("Error: something wrong here...");
      }

      PostModel.findById(req.params.id)
        .then(post => {
          res.json(post);
        })
        .catch(e => {
          res.status(500).send("Something wrong here");
        });
    })
    .catch(e => res.status(500).send("Error: failed to verify username"));
};

exports.addToLikedPost = (req, res) => {
  UserModel.findById(req.decode.id)
    .then(user => {
      if (!user) {
        return res.status(403).send("Error: something wrong here...");
      }
      PostModel.findById(req.body.id)
        .then(post => {
          PostModel.findByIdAndUpdate(req.body.id, {
            likes: req.body.likes,
            likedBy: [...post.likedBy, user._id]
          })
            .then(u => res.json("Success"))
            .catch(e => res.json("Failed"));
        })
        .catch(e => res.status(500).send("Error: failed to verify username"));
    })
    .catch(e => res.status(500).send("Error: failed to verify username"));
};

exports.removeFromLikedPost = (req, res) => {
  UserModel.findById(req.decode.id)
    .then(user => {
      if (!user) {
        return res.status(403).send("Error: something wrong here...");
      }
      PostModel.findById(req.body.id)
        .then(post => {
          PostModel.findByIdAndUpdate(req.body.id, {
            likes: req.body.likes,
            likedBy: post.likedBy.filter(i => i != req.decode.id)
          })
            .then(u => res.json("Success"))
            .catch(e => res.json("Failed"));
        })
        .catch(e => res.status(500).send("Error: failed to verify username"));
    })
    .catch(e => res.status(500).send("Error: failed to verify username"));
};

exports.postsforTimeline = async (req, res) => {
  // Posts only are by followings
  // add isLiked property to filter liked posts

  await UserModel.findById(req.decode.id)
    .then(user => {
      const followers = user.followings;
      followers.push(user._id);

      PostModel.find()
        .then(posts => {
          res.json(
            posts
              .filter(post => {
                return followers.indexOf(post.owner) != -1;
              })
              .map(post => {
                const checker = post._doc.likedBy.some(e => {
                  return e.toString() == user._id.toString();
                });
                if (checker) {
                  return {
                    ...post._doc,
                    liked: true
                  };
                } else {
                  return {
                    ...post._doc,
                    liked: false
                  };
                }
              }).reverse()
          );
        })
        .catch(e => {
          res.json("Can't find any post");
        });
    })
    .catch(e => {
      res.status(500).send("Error: Something's wrong");
    });
};
