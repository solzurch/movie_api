const express = require("express");
const bodyParser = require("body-parser");
const uuid = require("uuid");
const fs = require('fs');
const path = require('path');
const morgan = require('morgan');

const app = express();

app.use(bodyParser.json()); // Fixed: Added parentheses

// set up static file serving
app.use(express.static('public'));

// create a write stream (in append mode)
// a ‘log.txt’ file is created in root directory
const accessLogStream = fs.createWriteStream(path.join(__dirname, 'log.txt'), { flags: 'a' })

// setup the logger
app.use(morgan('combined', { stream: accessLogStream }));

let users = [
  {
    id: 1,
    name: "Kim",
    favoritesMovies: [],
  },
  {
    id: 2,
    name: "Joe",
    favoritesMovies: ["Reservoir Dogs"],
  },
];

let movies = [
  {
    Title: "Reservoir Dogs",
    Director: "Quentin Tarantino",
    ReleaseYear: "1992",
    Genres: "Crime, Thriller",
  },
  {
    Title: "Pulp Fiction",
    Director: "Quentin Tarantino",
    ReleaseYear: "1995",
    Genres: "Crime, Drama, Thriller",
  },
  {
    Title: "Jackie Brown",
    Director: "Quentin Tarantino",
    ReleaseYear: "1997",
    Genres: "Crime, Drama, Thriller",
  },
  {
    Title: "Kill Bill Vol.I",
    Director: "Quentin Tarantino",
    ReleaseYear: "2003",
    Genres: "Action",
  },
  {
    Title: "Kill Bill Vol.II",
    Director: "Quentin Tarantino",
    ReleaseYear: "2004",
    Genres: "Action, Drama",
  },
  {
    Title: "Death Proof",
    Director: "Quentin Tarantino",
    ReleaseYear: "2007",
    Genres: "Horror, Action",
  },
  {
    Title: "Inglourious Bastards",
    Director: "Quentin Tarantino",
    ReleaseYear: "2009",
    Genres: "War, Action, Thriller",
  },
  {
    Title: "Django Unchained",
    Director: "Quentin Tarantino",
    ReleaseYear: "2012",
    Genres: "Western, Action, Thriller",
  },
  {
    Title: "The Hateful Eight",
    Director: "Quentin Tarantino",
    ReleaseYear: "2015",
    Genres: "Western, Thriller",
  },
  {
    Title: "Once Upon a Time in Hollywood",
    Director: "Quentin Tarantino",
    ReleaseYear: "2019",
    Genres: "Drama, Thriller",
  },
];

// CREATE
app.post("/users", (req, res) => {
  const newUser = req.body;

  if (newUser.name) {
    newUser.id = uuid.v4();
    users.push(newUser);
    res.status(201).json(newUser);
  } else {
    res.status(400).send("users need names");
  }
});

// UPDATE
app.put("/users/:id", (req, res) => {
  const { id } = req.params;
  const updatedUser = req.body;

  let user = users.find((user) => user.id == id);

  if (user) {
    user.name = updatedUser.name;
    res.status(200).json(user);
  } else {
    res.ststus(400).send("no such user");
  }
});

// ADD MOVIE TO USER'S FAVORITES
app.post("/users/:id/:movieTitle", (req, res) => {
  const { id, movieTitle } = req.params;

  let user = users.find((user) => user.id == id);

  if (user) {
    user.favoritesMovies.push(movieTitle);
    res
      .status(200)
      .send(`${movieTitle} has been added to user ${id}'s array`); // Fixed: Corrected string interpolation
  } else {
    res.status(400).send("no such user");
  }
});

// DELETE MOVIE FROM USER'S FAVORITES
app.delete("/users/:id/:movieTitle", (req, res) => {
  const { id, movieTitle } = req.params;

  let user = users.find((user) => user.id == id);

  if (user) {
    user.favoritesMovies = user.favoritesMovies.filter(
      (title) => title !== movieTitle
    );
    res
      .status(200)
      .send(`${movieTitle} has been removed from user ${id}'s array`); // Fixed: Corrected string interpolation
  } else {
    res.status(400).send("no such user");
  }
});

// DELETE USER
app.delete("/users/:id", (req, res) => {
  const { id } = req.params;

  let userIndex = users.findIndex((user) => user.id == id);

  if (userIndex !== -1) {
    users.splice(userIndex, 1);
    res.status(200).send(`user ${id} has been deleted`);
  } else {
    res.status(400).send("no such user");
  }
});

// READ  Gets the list of data about ALL movies
app.get("/movies", (req, res) => {
  res.status(200).json(movies);
});

// READ  Gets the data about a single movie, by title
app.get("/movies/:title", (req, res) => {
  const { title } = req.params;
  const movie = movies.find((movie) => movie.Title === title);

  if (movie) {
    res.status(200).json(movie);
  } else {
    res.status(400).send("no such movie");
  }
});

// READ  Gets the data about a single movie, by genre
app.get("/movies/genres/:genre", (req, res) => {
  const { genre } = req.params;
  const filteredMovies = movies.filter(movie => movie.Genres.includes(genre));

  if (filteredMovies.length > 0) {
    res.status(200).json(filteredMovies);
  } else {
    res.status(400).send("no movies found for this genre");
  }
});

// Gets the data about a single movie, by release year
app.get("/movies/releaseYear/:releaseYear", (req, res) => {
  const { releaseYear } = req.params;
  const filteredMovies = movies.filter(movie => movie.ReleaseYear === releaseYear);

  if (filteredMovies.length > 0) {
    res.status(200).json(filteredMovies);
  } else {
    res.status(400).send("no movies found for this release year");
  }
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

// listen for requests
app.listen(8080, () => {
  console.log("Your app is listening on port 8080.");
});