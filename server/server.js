const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const path = require("path");

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
    useFindAndModify: false,
  })
  .then(() => console.log(`Mongo doing the mambo-jambo.`))
  .catch((err) => console.log(err));

// Use Routes
app.use("/api/users", require("./routes/api/users"));

// Deployment
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
});

// Set port server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server ever shining on port ${PORT}!`));
