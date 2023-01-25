// http
// import
const http = require("http");
const express = require('express');
const { engine } = require("express-handlebars");
const handlebars = require('handlebars');
const app = express();

/* création d'un serveur
http
  .createServer(function (req, res) {
    res.end("http");
  })
  .listen(3000, "127.0.0.1"); */

// log
console.log("ça fonctionne !");

// configure handlebar
app.engine("hbs", engine({
  extname: "hbs",
  defaultLayout: "main",
})
);
app.set("view engine", "hbs");
app.set("views", "./views");

//Routes
app.get("/", (req, res) => {
  res.render("pages/home");
});

app.get("/contact", (req, res) => {
  res.render("pages/contact");
});

app.get("/animes", (req, res) => {
  res.render("pages/animes");
});

app.get("/cartes", (req, res) => {
  res.render("pages/cartes");
});

app.get("/connexion", (req, res) => {
  res.render("pages/connexion");
});

app.get("/creation", (req, res) => {
  res.render("pages/creation");
});

app.get("/id", (req, res) => {
  res.render("pages/id");
});

app.get("/jeuxvideos", (req, res) => {
  res.render("pages/jeuxvideos");
});

app.get("/mangas", (req, res) => {
  res.render("pages/mangas");
});

app.get("/mdpoublie", (req, res) => {
  res.render("pages/mdpoublie");
});

app.get("/profil", (req, res) => {
  res.render("pages/profil")
})

// On demarre notre app en lui demandant d'être à l'écoute du port
app.listen(3000, () =>
  console.log(`on port 3000`)
);
