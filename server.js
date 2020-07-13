const express = require("express");
const mongoose = require("mongoose");

const app = express();

// Bodyparser
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// DB Config
const db = require("./config/keys").mongoURI;

mongoose
  .connect(db, { useUnifiedTopology: true, useNewUrlParser: true })
  .then(() => console.log(`Mongo doing the mambo-jambo.`))
  .catch((err) => console.log(err));

app.get("/", (req, res) => {
  res.send("Hello world.");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server ever shining on port ${PORT}!`));
