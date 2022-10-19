const express = require("express");
const cors = require("cors");
const app = express();
require("dotenv").config();
app.use(cors());
app.use(express.json()); //for post

const PORT = process.env.PORT;
const connect = require("./config/db");

//controllers....
const actorsController = require("./Controller/actors.controller");
const movieController = require("./Controller/movie.controller");
const producersController = require("./Controller/producers.controller");
const { register, login } = require("./Controller/user.controller");

// Middleware....
app.post("/register", register);
app.post("/login", login);
app.use("/movie", movieController);
app.use("/actor", actorsController);
app.use("/producer", producersController);

app.listen(PORT, async () => {
  try {
    await connect();
    console.log(`Listening on port ${PORT}`);
  } catch (error) {
    console.log(error);
  }
});
