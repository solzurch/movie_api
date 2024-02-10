const express = require("express");
app = express();
bodyParser = require("body-parser");
uuid = require("uuid");

app.use(bodyParser.json);

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

// CREATE
app.post("/users/:id/:movieTitle", (req, res) => {
  const { id, movieTitle } = req.params;

  let user = users.find((user) => user.id == id);

  if (user) {
    user.favoritesMovies.push(movieTitle);
    res.status(200).send("${movieTitle} has been added to user $(id)`s array");
  } else {
    res.ststus(400).send("no such user");
  }
});

// DELETE
app.delete("/users/:id/:movieTitle", (req, res) => {
  const { id, movieTitle } = req.params;

  let user = users.find( user => user.id == id);

  if (user) {
    user.favoritesMovies = user.favoritesMovies.filter(
      (title) => title !== movieTitle
    );
    res
      .status(200)
      .send("${movieTitle} has been removed from user $(id)`s array");
  } else {
    res.ststus(400).send("no such user");
  }
});

// DELETE
app.delete("/users/:id", (req, res) => {
  const { id } = req.params;

  let user = users.find( user => user.id == id);

  if (user) {
    users = users.filter( user => user.id != id);
    res.status(200).send(`user $(id) has been deleted`);;
  } else {
    res.ststus(400).send("no such user");
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
}),
  // READ  Gets the data about a single movie, by genre
  app.get("/movies/genres/:genre", (req, res) => {
    const { genres } = req.params;
    const genre = movies.find((movie) => movie.Genre === genre).Genre;

    if (genre) {
      res.status(200).json(genre);
    } else {
      res.status(400).send("no such genre");
    }
  }),
  // Gets the data about a single movie, by release year
  app.get("/movies/releaseYear/:releaseYear", (req, res) => {
    read.json(
      movies.filter((movie) => {
        return movie.releaseYear === req.params.releaseYear;
      })
    );
  });

app.get("/documentation", (req, res) => {
  res.sendFile("public/documentation.html", { root: __dirname });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

// listen for requests
app.listen(8080, () => {
  console.log("Your app is listening on port 8080.");
});
