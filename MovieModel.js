const mongoose = require("mongoose");

const MovieSchema = new mongoose.Schema(
  {
    title: {
      type: String,
    },
    movieId: {
      type: Number,
    },
    year: {
      type: Number,
    },
    genre: {
      type: String,
    },
    imdbRating: {
      type: Number,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const MovieModel = mongoose.model("MovieSchema", MovieSchema, "movies");
module.exports = MovieModel;
