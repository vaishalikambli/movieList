import * as genresAPI from "./genreService";

const movies = [
  {
    _id: "FvUbWTR9CT4ZjuZff62E471815",//defauld id
    title: "Terminator",
    genre: { _id: "FvUbWTR9CT4ZjuZff62E471818", name: "Action" },
    numberInStock: 6,
    dailyRentalRate: 2.5,
    publishDate: "2018-01-03T19:04:28.809Z"
  },
  {
    _id: "FvUbWTR9CT4ZjuZff62E471816",
    title: "Die Hard",
    genre: { _id: "FvUbWTR9CT4ZjuZff62E471818", name: "Action" },
    numberInStock: 5,
    dailyRentalRate: 2.5
  },
  {
    _id: "FvUbWTR9CT4ZjuZff62E471817",
    title: "Get Out",
    genre: { _id: "FvUbWTR9CT4ZjuZff62E471818", name: "Action" },
    numberInStock: 8,
    dailyRentalRate: 3.5
  },
  {
    _id: "FvUbWTR9CT4ZjuZff62E471819",
    title: "Trip to Italy",
    genre: { _id: "FvUbWTR9CT4ZjuZff62E471818", name: "Action" },
    numberInStock: 7,
    dailyRentalRate: 3.5
  },
  {
    _id: "FvUbWTR9CT4ZjuZff62E47181a",
    title: "Airplane",
    genre: { _id: "FvUbWTR9CT4ZjuZff62E471814", name: "Comedy" },
    numberInStock: 7,
    dailyRentalRate: 3.5
  },
  {
    _id: "FvUbWTR9CT4ZjuZff62E47181b",
    title: "Wedding Crashers",
    genre: { _id: "FvUbWTR9CT4ZjuZff62E471814", name: "Comedy" },
    numberInStock: 7,
    dailyRentalRate: 3.5
  },
  {
    _id: "FvUbWTR9CT4ZjuZff62E47181e",
    title: "Gone Girl",
    genre: { _id: "FvUbWTR9CT4ZjuZff62E471820", name: "Thriller" },
    numberInStock: 7,
    dailyRentalRate: 4.5
  },
  {
    _id: "FvUbWTR9CT4ZjuZff62E47181f",
    title: "The Sixth Sense",
    genre: { _id: "FvUbWTR9CT4ZjuZff62E471820", name: "Thriller" },
    numberInStock: 4,
    dailyRentalRate: 3.5
  },
  {
    _id: "FvUbWTR9CT4ZjuZff62E471821",
    title: "The Avengers",
    genre: { _id: "FvUbWTR9CT4ZjuZff62E471818", name: "Action" },
    numberInStock: 7,
    dailyRentalRate: 3.5
  }
];

export function getMovies() {
  return movies;
}

export function getMovie(id) {
  return movies.find(m => m._id === id);
}

export function saveMovie(movie) {
  let movieInDb = movies.find(m => m._id === movie._id) || {};
  movieInDb.name = movie.name;
  movieInDb.genre = genresAPI.genres.find(g => g._id === movie.genreId);
  movieInDb.numberInStock = movie.numberInStock;
  movieInDb.dailyRentalRate = movie.dailyRentalRate;

  if (!movieInDb._id) {
    movieInDb._id = Date.now();
    movies.push(movieInDb);
  }

  return movieInDb;
}

export function deleteMovie(id) {
  let movieInDb = movies.find(m => m._id === id);
  movies.splice(movies.indexOf(movieInDb), 1);
  return movieInDb;
}
