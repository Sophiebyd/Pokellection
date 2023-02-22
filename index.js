// http
// import
const http = require("http");
const express = require("express");
const { engine } = require("express-handlebars");
const handlebars = require("handlebars");
const mysql = require("mysql");
const methodOverride = require("method-override");
const bodyParser = require("body-parser");
require("dotenv").config();
const { mailSend } = require("./back/utils/nodeMailer");
const upload = require("./back/config/other/multer");
const expressSession = require("express-session");
const MySQLStore = require("express-mysql-session")(expressSession);


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

// Import des middlewares
const { isAdmin, isSession } = require("./back/middleware/index");
const app = express();

/*
 * Config mysql
 ***************/
let configDB = {
  host: DB_HOST, // localhost
  user: DB_USER, // user
  password: DB_PASSWORD, // password
  database: DB_DATABASE, // nameDatabase
};

// Création de la connection avec les paramètres donnés
db = mysql.createConnection(configDB);
db.query = require("util").promisify(db.query).bind(db);

// Connexion de la db mysql
db.connect((err) => {
  if (err) console.error("error connecting: ", err.stack);
  console.log("connecchated as id ", db.threadId);
});

/*
 * Config method override
 *************************/
app.use(methodOverride("_method"));

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
app.use("/assets", express.static("public"));

// ! Import des helpers
const { formatDate } = require("./back/helpers");

// configure handlebar
app.engine(
  "hbs",
  engine({
    // ! initialisation des helpers dans notre handlebars
    helpers: {
      formatDate,
    },
    extname: "hbs",
    defaultLayout: "main",
  })
);
app.set("view engine", "hbs");
app.set("views", "./views");

const router = require ('./back/router')
app.use (router)

// Configuration Express-Session
const sessionStore = new MySQLStore(configDB);
app.use(
  expressSession({
    secret: "securite",
    name: "poti-gato",
    saveUninitialized: true,
    resave: false,
    store: sessionStore
  })
);

// On demarre notre app en lui demandant d'être à l'écoute du port
app.listen(PORT_NODE, () => console.log(`on port ${PORT_NODE}`));

module.exports = { db, app };
