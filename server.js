const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");

const { User } = require("./models/user");
const config = require("./config/keys");

const app = express();

// Bodyparser
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

// DB Config
const db = config.mongoURI;

// DB Connect
mongoose
  .connect(db, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
  })
  .then(() => console.log(`Mongo doing the mambo-jambo.`))
  .catch((err) => console.log(err));

// Requests
app.get("/", (req, res) => {
  res.json({ "hello ~": "hi ~~" });
});

app.post("/api/users/register", (req, res) => {
  const user = new User(req.body);
  user.save((err, userData) => {
    if (err) return res.status(400).json({ success: false });

    return res.status(200).json({ success: true });
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server ever shining on port ${PORT}!`));
