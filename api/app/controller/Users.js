const UserModel = require("../models/User.model");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const { config } = require("../config/config");
const jwt = require("jsonwebtoken");

exports.register = (req, res) => {

  bcrypt.hash(req.body.password, saltRounds, function(err, hash) {
    if (err) {
      return res.status(500).send("Error: somethings wrong in bcrypt");
    }

    const username = req.body.username;

    UserModel.create({
      username: username,
      password: hash
    })
      .then(data => {
        return res.json({ data: data });
      })
      .catch(e => {
        return res.status(500).send(e);
      });
  });
};

exports.login = (req, res) => {
  UserModel.findOne({ username: req.body.username }).then(user => {
    if (!user) {
      res.status(500).send("Error: Wrong Credential");
    } else {
      bcrypt.compare(req.body.password, user.password, (err, result) => {
        if (err) {
          return res.status(500).send("Error: Something wrong in bcrypt login");
        }

        if (result) {
          const token = jwt.sign(
            { id: user._id },
            config.secret,
            {
              expiresIn: "24h"
            }
          );
          return res.json({
            success: true,
            token: token,
            username: user.username,
            picture: user.profilePic || ""
          });
        } else {
          return res.status(403).send("Error: Auth failed");
        }
      });
    }
  });
};
