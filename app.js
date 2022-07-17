const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

//Set up default mongoose connection
var mongoDB =
  "mongodb+srv://test_user_2:yEh0kClyZpnibla8@cluster1.4y8q0.mongodb.net/sageinteractor?retryWrites=true&w=majority";
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });

//Get the default connection
var db = mongoose.connection;

db.on("open", () => {
  console.log("MongoDB Connected");
});

const SageInteractor = require("./SageInteractor");

//Bind connection to error event (to get notification of connection errors)
db.on("error", console.error.bind(console, "MongoDB connection error:"));

app.use(bodyParser.json({ limit: "250mb" }));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/heartbeat", async (req, res) => {
  console.log("Heartbeat");
  res.status(200).json({ hello: "World" }).send();
  return;
});

app.post("/createNewMovie", async (req, res) => {
  let sageInteractor = new SageInteractor();
  const response = await sageInteractor.createNewMovie(req.body);
  if (response.status === 200) {
    return res.json(response.data);
  } else {
    res.status(response.status).json({ message: response.message }).send(); // *
    return;
  }
});

app.get("/getMovieById/:movieId", async (req, res) => {
  let sageInteractor = new SageInteractor();
  const response = await sageInteractor.getMovieById(req.params.movieId);
  if (response.status === 200) {
    return res.json(response.data);
  } else {
    res.status(response.status).json({ message: response.message }).send(); // *
    return;
  }
});

app.get("/getMovieTitleByMovieId/:movieId", async (req, res) => {
  let sageInteractor = new SageInteractor();
  const response = await sageInteractor.getMovieTitleById(req.params.movieId);
  if (response.status === 200) {
    return res.json(response.data);
  } else {
    res.status(response.status).json({ message: response.message }).send(); // *
    return;
  }
});

app.get("/getAllMovies", async (req, res) => {
  let sageInteractor = new SageInteractor();
  const response = await sageInteractor.getAllMovies(
    req.query.sortKey,
    req.query.sortOrder
  );
  if (response.status === 200) {
    return res.json(response.data);
  } else {
    res.status(response.status).json({ message: response.message }).send(); // *
    return;
  }
});

app.listen(3000, () => {
  console.log(`server Started at Port ${3000}`);
});
