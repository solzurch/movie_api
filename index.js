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

let topTarantinoMovies = [
  {
    title: "Reservoir Dogs (1992)",
    author: "Quentin Tarantino",
  },
  {
    title: "Pulp Fiction (1995)",
    author: "Quentin Tarantino",
  },
  {
    title: "Jackie Brown (1997)",
    author: "Stephanie Meyer",
  },
  {
    title: "Kill Bill Vol.I (2003)",
    author: "Quentin Tarantino",
  },
  {
    title: "Kill Bill Vol.II (2004)",
    author: "Quentin Tarantino",
  },
  {
    title: "Death Proof (2007)",
    author: "Quentin Tarantino",
  },
  {
    title: "Inglourious Bastards (2009)",
    author: "Quentin Tarantino",
  },
  {
    title: "Django Unchained (2012))",
    author: "Quentin Tarantino",
  },
  {
    title: "The Hateful Eight (2015))",
    author: "Quentin Tarantino",
  },
  {
    title: "Once Upon a Time in Hollywood (2019))",
    author: "Quentin Tarantino",
  },
];

// setup the logger
app.use(morgan("combined", { stream: accessLogStream }));
app.use(express.static("public"));

// GET requests
app.get("/", (req, res) => {
  res.send("Welcome to Tarantino Movies!");
});

app.get("/documentation", (req, res) => {
  res.sendFile("public/documentation.html", { root: __dirname });
});

app.get("/movies", (req, res) => {
  res.json(topTarantinoMovies);
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

// listen for requests
app.listen(8080, () => {
  console.log("Your app is listening on port 8080.");
});
