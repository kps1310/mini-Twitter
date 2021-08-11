const express = require("express");
const app = express();
const path = require("path");

// Middleware

const cors = require("cors");
const bodyParser = require("body-parser");

const userValidator = require("./app/middleware/Validator");

const auth = require("./app/middleware/Auth");

app.use('/assets', express.static(path.join(__dirname, '/app/assets')));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

// Routes

const usersRoute = require("./app/routes/users.routes");
const postsRoute = require("./app/routes/posts.routes");
const profileRoute = require("./app/routes/profile.routes");

app.get("/", (req, res) => {
  res.json("Welcome go to frontend and npm start it.");
});

app.use("/users", userValidator("createUser"), usersRoute);
app.use("/posts", auth, postsRoute);
app.use("/profile", auth, profileRoute);

// Database

require("./app/database/connect_db")();

const port = process.env.PORT || 5001;

app.listen(port, () => console.log(`Magic is happening on PORT: ${port}`));
