const mongoose = require("mongoose");
var expect = require("chai").expect;

var mongoDB =
  "mongodb+srv://test_user_2:yEh0kClyZpnibla8@cluster1.4y8q0.mongodb.net/sageinteractor?retryWrites=true&w=majority";
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });

//Get the default connection
const db = mongoose.connection;

db.on("open", () => {
  console.log("MongoDB Connected");
});

const SageInteractor = require("../SageInteractor");
const body = {
  title: "Batman",
  movieId: 6,
  year: 2020,
  genre: "Thriller",
  imdbRating: 9,
};
//Bind connection to error event (to get notification of connection errors)
db.on("error", console.error.bind(console, "MongoDB connection error:"));

describe("SageInteractorTest", function () {
  it("CreateNewMovie", async function () {
    let sageInteractor = new SageInteractor();
    const response = await sageInteractor.createNewMovie(body);
    expect(response.status).to.equal(200);
    expect(response.data.movieId).to.equal(body.movieId);
  });
  it("GetMovieById", async function () {
    let sageInteractor = new SageInteractor();
    const response = await sageInteractor.getMovieById(body.movieId);
    expect(response.status).to.equal(200);
    expect(response.data[0].title).to.equal(body.title);
  });
  it("GetMovieTitleByMovieId", async function () {
    let sageInteractor = new SageInteractor();
    const response = await sageInteractor.getMovieTitleById(body.movieId);
    expect(response.status).to.equal(200);
    expect(response.data[0].title).to.equal(body.title);
  });
  it("GetAllMoviesSortByTimestampDesc", async function () {
    let sageInteractor = new SageInteractor();
    const response = await sageInteractor.getAllMovies("createdAt", -1);
    expect(response.status).to.equal(200);
    let length = response.data.length;
    if (length > 0) {
      let firstIndexData = response.data[0];
      let secondIndexData = response.data[1];
      expect(firstIndexData.createdAt).to.greaterThanOrEqual(
        secondIndexData.createdAt
      );
    }
  });
  it("GetAllMoviesSortByTimestampAsc", async function () {
    let sageInteractor = new SageInteractor();
    const response = await sageInteractor.getAllMovies("createdAt", 1);
    expect(response.status).to.equal(200);
    let length = response.data.length;
    if (length > 0) {
      let firstIndexData = response.data[0];
      let secondIndexData = response.data[1];
      expect(firstIndexData.createdAt).to.lessThanOrEqual(
        secondIndexData.createdAt
      );
    }
  });
  it("GetAllMoviesSortByMovieIdDesc", async function () {
    let sageInteractor = new SageInteractor();
    const response = await sageInteractor.getAllMovies("movieId", -1);
    expect(response.status).to.equal(200);
    let length = response.data.length;
    if (length > 0) {
      let firstIndexData = response.data[0];
      let secondIndexData = response.data[1];
      expect(firstIndexData.movieId).to.greaterThanOrEqual(
        secondIndexData.movieId
      );
    }
  });
  it("GetAllMoviesSortByMovieIdAsc", async function () {
    let sageInteractor = new SageInteractor();
    const response = await sageInteractor.getAllMovies("movieId", 1);
    expect(response.status).to.equal(200);
    let length = response.data.length;
    if (length > 0) {
      let firstIndexData = response.data[0];
      let secondIndexData = response.data[1];
      expect(firstIndexData.movieId).to.lessThanOrEqual(
        secondIndexData.movieId
      );
    }
  });
  it("DataValidationTesting", async function () {
    let sageInteractor = new SageInteractor();
    const response = await sageInteractor.getMovieById();
    expect(response.status).to.equal(400);
    expect(response.message).to.equal("Movie Id is required");
  });
});
