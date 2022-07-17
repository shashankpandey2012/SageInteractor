const MovieModel = require("./MovieModel");

class SageInteractor {
  constructor() {}

  async createNewMovie(movieData) {
    try {
      if (movieData) {
        if (!movieData.title) {
          return {
            status: 400,
            message: "Movie Title is required",
          };
        }
        if (!movieData.movieId) {
          return {
            status: 400,
            message: "movieId is required",
          };
        }
        if (!movieData.year) {
          return {
            status: 400,
            message: "year is required",
          };
        }
        if (!movieData.genre) {
          return {
            status: 400,
            message: "genre is required",
          };
        }
        if (!movieData.imdbRating) {
          return {
            status: 400,
            message: "imdbRating is required",
          };
        }

        let data = {
          title: movieData.title,
          movieId: movieData.movieId,
          year: movieData.year,
          genre: movieData.genre,
          imdbRating: movieData.imdbRating,
        };
        const Movie = new MovieModel(data);
        let createdMovie = await Movie.save();
        return {
          status: 200,
          data: createdMovie,
        };
      } else {
        return {
          status: 400,
          message: "Invalid Data",
        };
      }
    } catch (e) {
      console.log("Exception Occurred", e);
      return {
        status: 400,
        message: "Something Went Wrong, Please try again later",
      };
    }
  }

  async getMovieById(movieId) {
    try {
      if (!movieId) {
        return {
          status: 400,
          message: "Movie Id is required",
        };
      }
      let userData = await MovieModel.find({
        movieId: movieId,
        isActive: true,
      });
      return {
        status: 200,
        data: userData,
      };
    } catch (e) {
      console.log("Exception occured", e);
      return {
        status: 400,
        message: "Something Went Wrong, Please try again later",
      };
    }
  }

  async getMovieTitleById(movieId) {
    try {
      if (!movieId) {
        return {
          status: 400,
          message: "Movie Id is required",
        };
      }
      let userData = await MovieModel.find(
        {
          movieId: movieId,
          isActive: true,
        },
        { title: 1 }
      );
      return {
        status: 200,
        data: userData,
      };
    } catch (e) {
      console.log("Exception occured", e);
      return {
        status: 400,
        message: "Something Went Wrong, Please try again later",
      };
    }
  }

  async getAllMovies(sortKey, sortOrder) {
    try {
      if (!sortKey) {
        sortKey = "movieId";
      }
      if (!sortOrder) {
        sortOrder = 1;
      }

      let userData = await MovieModel.find(
        { isActive: true },
        {},
        { sort: { [sortKey]: sortOrder } }
      );
      return {
        status: 200,
        data: userData,
      };
    } catch (e) {
      console.log("Exception occured", e);
      return {
        status: 400,
        message: "Something Went Wrong, Please try again later",
      };
    }
  }
}

module.exports = SageInteractor;
