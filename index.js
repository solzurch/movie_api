const express = require("express");
(morgan = require("morgan")),
  (fs = require("fs")), // import built in node modules fs and path
  (path = require("path"));

const app = express();

// create a write stream (in append mode)
// a ‘log.txt’ file is created in root directory
const accessLogStream = fs.createWriteStream(path.join(__dirname, "log.txt"), {
  flags: "a",
});

// setup the logger
app.use(morgan("combined", { stream: accessLogStream }));

// Middleware for serving static files
app.use(express.static("public"));

let topTarantinoMovies = [
  {
    id: 1,
    title: "Reservoir Dogs",
    director: "Quentin Tarantino",
    releaseYear: "1992",
    genres: "Crime, Thriller",
  },
  {
    id: 2,
    title: "Pulp Fiction",
    director: "Quentin Tarantino",
    releaseYear: "1995",
    genres: "Crime, Drama, Thriller",
  },
  {
    id: 3,
    title: "Jackie Brown",
    director: "Quentin Tarantino",
    releaseYear: "1997",
    genres: "Crime, Drama, Thriller",
  },
  {
    id: 4,
    title: "Kill Bill Vol.I",
    director: "Quentin Tarantino",
    releaseYear: "2003",
    genres: "Action",
  },
  {
    id: 5,
    title: "Kill Bill Vol.II",
    director: "Quentin Tarantino",
    releaseYear: "2004",
    genres: "Action, Drama",
  },
  {
    id: 6,
    title: "Death Proof",
    director: "Quentin Tarantino",
    releaseYear: "2007",
    genres: "Horror, Action",
  },
  {
    id: 7,
    title: "Inglourious Bastards",
    director: "Quentin Tarantino",
    releaseYear: "2009",
    genres: "War, Action, Thriller",
  },
  {
    id: 8,
    title: "Django Unchained",
    director: "Quentin Tarantino",
    releaseYear: "2012",
    genres: "Western, Action, Thriller",
  },
  {
    id: 9,
    title: "The Hateful Eight",
    director: "Quentin Tarantino",
    releaseYear: "2015",
    genres: "Western, Thriller",
  },
  {
    id: 10,
    title: "Once Upon a Time in Hollywood",
    director: "Quentin Tarantino",
    releaseYear: "2019",
    genres: "Drama, Thriller",
  },
];

// GET requests
app.get("/", (req, res) => {
  res.send("Welcome to Tarantino Movies!");
});

// Gets the list of data about ALL movies
app.get("/movies", (req, res) => {
  res.json(topTarantinoMovies);
  res.status(200).send("movies array");
});

// Gets the data about a single movie, by title
app.get("/movies/:title", (req, res) => {
  read.json(
    movies.find((movie) => {
      return movie.title === req.params.title;
    })
  );
});

// Gets the data about a single movie, by id
app.get("/movies/id/:id", (req, res) => {
  read.json(
    movies.filter((movie) => {
      return movie.id === req.params.id;
    })
  );
});

// Gets the data about a single movie, by genre
app.get("/movies/genres/:genre", (req, res) => {
  read.json(
    movies.filter((movie) => {
      return movie.genre === req.params.genre;
    })
  );
});

// Gets the data about a single movie, by release year
app.get("/movies/releaseYear/:releaseYear", (req, res) => {
  read.json(
    movies.filter((movie) => {
      return movie.releaseYear === req.params.releaseYear;
    })
  );
});

app.get("/documentation", (req, res) => {
  res.sendFile("public/documentation.html", { root:__dirname});
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

// listen for requests
app.listen(8080, () => {
  console.log("Your app is listening on port 8080.");
});
