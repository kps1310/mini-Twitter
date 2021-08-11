const UserModel = require("../models/User.model");
const saltRounds = 10;
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");

exports.getProfiles = (req, res) => {
  UserModel.findById(req.decode.id)
    .then(user => {
      if (!user) {
        return res.status(403).send("Invalid login");
      }

      UserModel.find()
        .then(users => {
          res.json(users);
        })
        .catch(e => {
          res.status(500).send("No Users Found");
        });
    })
    .catch(e => {
      res.status(403).send("Invalid login");
    });
};

exports.getProfile = (req, res) => {
  UserModel.findById(req.decode.id)
    .then(person => {
      if (!person) {
        return res.status(403).send("Invalid login");
      }

      UserModel.findOne({ username: req.params.username })
        .then(user => {
          if (user._id.toString() === req.decode.id.toString()) {
            return res.json({
              id: user._id,
              username: user.username,
              picture: user.profilePic || "",
              bio: user.bio || "",
              followers: user.followers,
              followings: user.followings,
              posts: user.posts,
              current: true,
              following: false
            });
          } else {
            const followers = user.followers;

            return res.json({
              id: user._id,
              username: user.username,
              picture: user.profilePic || "",
              bio: user.bio || "",
              followers: user.followers,
              followings: user.followings,
              posts: user.posts,
              current: false,
              following: followers.includes(person._id)
            });
          }
        })
        .catch(e => {
          res.status(500).send("No User Found");
        });
    })
    .catch(e => {
      res.status(403).send("Invalid login");
    });
};

exports.searchProfile = (req, res) => {
  UserModel.findById(req.decode.id)
    .then(user => {
      if (!user) {
        return res.status(403).send("Invalid login");
      }

      UserModel.find()
        .then(users => {
          res.json(
            users.filter(user => user.username.includes(req.params.query))
          );
        })
        .catch(e => {
          res.status(500).send("No User Found");
        });
    })
    .catch(e => {
      res.status(403).send("Invalid login");
    });
};

exports.update = (req, res) => {
  UserModel.findByIdAndUpdate(req.decode.id, {
    bio: req.body.bio
  })
    .then(user => {
      if (!user) {
        return res.status(500).send("Error: something's wrong...");
      }
      req.json({ message: "Success" });
    })
    .catch(e => {
      res.json({ message: "Failed updation" });
    });
};

exports.deleteUser = (req, res) => {
  UserModel.findByIdAndDelete(req.decode.id)
    .then(user => {
      res.json({ message: "Deleted" });
    })
    .catch(e => {
      res.json({ message: "Failed deletion" });
    });
};

exports.resetPass = (req, res) => {
  bcrypt.hash(req.body.password, saltRounds, (err, hash) => {
    if (err) {
      return res.json("Something went wrong");
    }

    UserModel.findByIdAndUpdate(req.decode.id, {
      password: hash
    })
      .then(user => {
        if (!user) {
          return res.status(500).send("Error: something's wrong...");
        }
        req.json({ message: "Success" });
      })
      .catch(e => {
        res.json({ message: "Failed updation" });
      });
  });
};

exports.followUser = (req, res) => {
  UserModel.findById(req.decode.id)
    .then(user => {
      UserModel.findById(req.body.id)
        .then(person => {
          const followers = person.followers;
          person.update(
            {
              followers: [...followers, user._id.toString()]
            },
            (err, usr) => {
              if (err) {
                return res.json("Failed in update person" + err);
              }
              const followings = user.followings;
              user.update(
                {
                  followings: [...followings, person._id.toString()]
                },
                (err, usr) => {
                  if (err) {
                    return res.json(err);
                  }
                  res.json({ person: person, user: user });
                }
              );
            }
          );
        })
        .catch(e => res.json("Failed in person"));
    })
    .catch(e => res.status(403).send("Error: token is invalid"));
};

exports.unfollowUser = (req, res) => {
  UserModel.findById(req.decode.id)
    .then(user => {
      UserModel.findById(req.body.id)
        .then(person => {
          const followings = user.followings;
          user.update(
            {
              followings: followings.filter(i => i != person._id)
            },
            (err, usr) => {
              if (err) {
                return res.json(err);
              }
              const followers = person.followers;
              person.update(
                {
                  followers: followers.filter(i => i != user._id)
                },
                (err, usr) => {
                  if (err) {
                    return res.json(err);
                  }
                  res.json({ person: person, user: user });
                }
              );
            }
          );
        })
        .catch(e => res.json("Can't find person"));
    })
    .catch(e => res.status(403).send("Error: token is invalid"));
};

exports.updatePic = (req, res) => {
  UserModel.findById(req.decode.id).then(u => {
    const name = req.file.filename;
    UserModel.findByIdAndUpdate(u._id, { profilePic: name }).then(user => {
      res.json(user);
    })
  }).catch(e => {
    res.status(403).send("Error Login");
  })
};
