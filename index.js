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

// configure handlebar
app.engine(
  "hbs",
  engine({
    extname: "hbs",
    defaultLayout: "main",
  })
);
app.set("view engine", "hbs");
app.set("views", "./views");

//////////////////////////////////// Routes //////////////////////////////////////////////////////////////////

// Home page
app
  .get("/", (req, res) => {
  // Récupération de tout les articles
  db.query(`SELECT * FROM categories`, (err, data) => {
    //if (process.env.MODE === "test") res.json(obj);
    if (err) throw err;
    console.log("data", data);
    return res.render("pages/home", { data });
  })
})

//////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Contact
app.get("/contact", (req, res) => {
  res.render("pages/contact");
});

//////////////////////////////////////////////////////////////////////////////////////////////////////////////

app.route("/animes")
.get(async (req, res) => {
const films = await db.query("SELECT * FROM articles WHERE titlefilms IS NOT NULL");
const series = await db.query("SELECT * FROM articles WHERE titleseries IS NOT NULL");
//if (process.env.MODE === "test") res.json({ films, series });
//else
 res.render("pages/animes", { films, series });
});


//////////////////////////////////////////////////////////////////////////////////////////////////////////////

app.route("/cartes")
.get(async (req, res) => {
const boosters = await db.query("SELECT * FROM articles WHERE titlebooster IS NOT NULL");
const decks = await db.query("SELECT * FROM articles WHERE titledeck IS NOT NULL");
//if (process.env.MODE === "test") res.json({ boosters, decks });
//else 
res.render("pages/cartes", { boosters, decks });
});

//////////////////////////////////////////////////////////////////////////////////////////////////////////////

app.get("/connexion", (req, res) => {
  res.render("pages/connexion");
});

//////////////////////////////////////////////////////////////////////////////////////////////////////////////

app.get("/creation", (req, res) => {
  res.render("pages/creation");
});

//////////////////////////////////////////////////////////////////////////////////////////////////////////////

app
  .get("/id", (req, res) => {
    db.query(`SELECT * FROM comments where id_articles = 1`, (err, data) => {
      if (err) throw err;
      console.log(data);
      res.render("pages/id", { data });
    });
  })
  .post("/id", (req, res) => {
    const { text } = req.body;
    db.query(
      `INSERT INTO comments (text, reported, Id_users, Id_articles) VALUES ('${text}', 0, 1,1);`,
      function (err, data) {
        if (err) throw err;
        console.log(data);
        res.render("pages/id");
      }
    );
  });

//////////////////////////////////////////////////////////////////////////////////////////////////////////////

app
  .get("/jeuxvideos", (req, res) => {
  // Récupération de tout les articles
  db.query(
    `SELECT * FROM articles WHERE titlejeux IS NOT NULL`,
    (err, data) => {
      //if (process.env.MODE === "test") res.json(obj);
      if (err) throw err;
      console.log("data", data);
      return res.render("pages/jeuxvideos", { data });
    }
  )
})

////////////////////////////////////////////////////////////////////////////////////////////////////////////

app
  .get("/mangas", (req, res) => {
  // Récupération de tout les articles
  db.query(
    `SELECT * FROM articles WHERE titlemangas IS NOT NULL`,
    (err, data) => {
      //if (process.env.MODE === "test") res.json(obj);
      if (err) throw err;
      console.log("data", data);
      return res.render("pages/mangas", { data })
    }
  )
})

//////////////////////////////////////////////////////////////////////////////////////////////////////////////

app.get("/mdpoublie", async (req, res) => {
  res.render("pages/mdpoublie");
});

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
// post // put // delete
app.get("/profil", async (req, res) => {
  res.render("pages/profil");
});

//////////////////////////////////////////////////////////////////////////////////////////////////////////////

app.get("/404", async (req, res) => {
  res.render("pages/page404");
});

//////////////////////////////////////////////////////////////////////////////////////////////////////////////

app.get("/admin", async (req, res) => {
  res.render("pages/admin");
});

//////////////////////////////////////////////////////////////////////////////////////////////////////////////

// On demarre notre app en lui demandant d'être à l'écoute du port
app.listen(PORT_NODE, () => console.log(`on port ${PORT_NODE}`));

module.exports = { db, app };
