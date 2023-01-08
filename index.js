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
  res.render("home");
});

app.get("/contact", (req, res) => {
  res.render("contact");
});


app.get("/navbar", (req, res) => {
  res.render("navbar");
});

app.get("/footer", (req, res) => {
  res.render("footer");
});

app.get("/animes", (req, res) => {
  res.render("animes");
});

app.get("/cartes", (req, res) => {
  res.render("cartes");
});

app.get("/connexion", (req, res) => {
  res.render("connexion");
});

app.get("/creationcompte", (req, res) => {
  res.render("creationcompte");
});

app.get("/id", (req, res) => {
  res.render("id");
});

app.get("/jeuxvideos", (req, res) => {
  res.render("jeuxvideos");
});

app.get("/mangas", (req, res) => {
  res.render("mangas");
});

app.get("/mdpoublie", (req, res) => {
  res.render("mdpoublie");
});

app.get("/homecontent", (req, res) => {
  res.render("homecontent")
})

app.get("/homecards", (req, res) => {
  res.render("homecards")
})

// On demarre notre app en lui demandant d'être à l'écoute du port
app.listen(3000, () =>
  console.log(`on port 3000`)
);
