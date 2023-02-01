// http
// import
const http = require("http");
const express = require('express');
const { engine } = require("express-handlebars");
const handlebars = require('handlebars');
const mysql = require("mysql");
const methodOverride = require('method-override');
const bodyParser = require('body-parser');
require('dotenv').config()

/* création d'un serveur
http
  .createServer(function (req, res) {
    res.end("http");
  })
  .listen(3000, "127.0.0.1"); 

// log
console.log("ça fonctionne !"); */

// Déstructuration des variables d'environement (process.env)
const { DB_DATABASE, DB_HOST, DB_PASSWORD, DB_USER, PORT_NODE } = process.env;
const app = express();

/*
* Config mysql
***************/
let configDB = {
  host: DB_HOST, // localhost
  user: DB_USER, // user
  password: DB_PASSWORD, // password
  database: DB_DATABASE // nameDatabase
};

// Création de la connection avec les paramètres donnés
db = mysql.createConnection(configDB);

// Connexion de la db mysql
db.connect((err) => {
  if (err) console.error('error connecting: ', err.stack);
  console.log('connecchated as id ', db.threadId);
});

/*
 * Config method override 
 *************************/
app.use(methodOverride('_method'));

/*
 * Config Body-parser
 *********************/

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

/*
 * Configuration de la route vers notre dossier static
 ******************************************************/
app.use("/assets", express.static('public'));


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
}
);

app.get("/404", (req, res) => {
  res.render("pages/page404")
});

app.get("/admin", (req, res) => {
  res.render("pages/admin")
})

app.get("/allan", (req, res) => {
  res.render("pages/allan")
});

// On demarre notre app en lui demandant d'être à l'écoute du port
app.listen(3000, () =>
  console.log(`on port 3000`)
);
