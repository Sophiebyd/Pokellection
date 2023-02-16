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
const path = require("path");
const fs = require("fs");

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

//////////////////////////////////// Routes //////////////////////////////////////////////////////////////////

// Home page
app.get("/", (req, res) => {
  // Récupération de tout les articles
  db.query(`SELECT * FROM categories`, (err, data) => {
    //if (process.env.MODE === "test") res.json(obj);
    if (err) throw err;
    console.log("data", data);
    return res.render("pages/home", { data });
  });
});

//////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Contact
app
  .get("/contact", (req, res) => {
    res.render("pages/contact");
  })

  .post("/contact", (req, res) => {
    const { lastname, firstname, email, subject, message } = req.body;

    mailSend(
      `${lastname} ${firstname} <${email}>`,
      `email <${process.env.MAIL_USER}>`,
      subject,
      `${email} ${message}`,
      async function (err, info) {
        if (err) throw err;
        console.log(info);
        res.redirect("/");
      }
    );
  });

//////////////////////////////////////////////////////////////////////////////////////////////////////////////

app.get("/jeuxvideos", (req, res) => {
  // Récupération de tout les articles
  db.query(
    `SELECT * FROM articles WHERE titlejeux IS NOT NULL`,
    (err, data) => {
      //if (process.env.MODE === "test") res.json(obj);
      if (err) throw err;
      console.log("data", data);
      return res.render("pages/jeuxvideos", { data });
    }
  );
});

//////////////////////////////////////////////////////////////////////////////////////////////////////////////

app.route("/cartes").get(async (req, res) => {
  const boosters = await db.query(
    "SELECT * FROM articles WHERE titlebooster IS NOT NULL"
  );
  const decks = await db.query(
    "SELECT * FROM articles WHERE titledeck IS NOT NULL"
  );
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

app.route("/animes").get(async (req, res) => {
  const films = await db.query(
    "SELECT * FROM articles WHERE titlefilms IS NOT NULL"
  );
  const series = await db.query(
    "SELECT * FROM articles WHERE titleseries IS NOT NULL"
  );
  //if (process.env.MODE === "test") res.json({ films, series });
  //else
  res.render("pages/animes", { films, series });
});

//////////////////////////////////////////////////////////////////////////////////////////////////////////////

app.get("/series/:id", (req, res) => {
  const { id } = req.params;
  // Récupération de tout les articles
  db.query(`SELECT * FROM articles WHERE Id_articles=${id}`, (err, data) => {
    //if (process.env.MODE === "test") res.json(obj);
    if (err) throw err;
    console.log("data", data);
    return res.render("pages/id_series", { data: data[0] });
  });
});

app.get("/films/:id", (req, res) => {
  const { id } = req.params;
  // Récupération de tout les articles
  db.query(`SELECT * FROM articles WHERE Id_articles=${id}`, (err, data) => {
    //if (process.env.MODE === "test") res.json(obj);
    if (err) throw err;
    console.log("data", data);
    return res.render("pages/id_films", { data: data[0] });
  });
});

app
  .get("/mangas/:id", (req, res) => {
    const { id } = req.params;
    // Récupération de tout les articles
    db.query(`SELECT * FROM articles WHERE Id_articles=${id}`, (err, data) => {
      //if (process.env.MODE === "test") res.json(obj);
      if (err) throw err;
      console.log("data", data);
      return res.render("pages/id_mangas", { data: data[0] });
    });
  })

  .get("/boosters/:id", (req, res) => {
    // Récupération de tout les articles
    const { id } = req.params;
    db.query(`SELECT * FROM articles WHERE Id_articles=${id}`, (err, data) => {
      //if (process.env.MODE === "test") res.json(obj);
      if (err) throw err;
      console.log("data", data);
      return res.render("pages/id_boosters", { data: data[0] });
    });
  });

app.get("/decks/:id", (req, res) => {
  const { id } = req.params;
  // Récupération de tout les articles
  db.query(`SELECT * FROM articles WHERE Id_articles=${id}`, (err, data) => {
    //if (process.env.MODE === "test") res.json(obj);
    if (err) throw err;
    console.log("data", data);
    return res.render("pages/id_decks", { data: data[0] });
  });
});

app.get("/jeux/:id", (req, res) => {
  const { id } = req.params;
  // Récupération de tout les articles
  db.query(`SELECT * FROM articles WHERE Id_articles=${id}`, (err, data) => {
    //if (process.env.MODE === "test") res.json(obj);
    if (err) throw err;
    console.log("data", data);
    return res.render("pages/id_jeux", { data: data[0] });
  });
});

////////////////////////////////////////////////////////////////////////////////////////////////////////////

app.get("/mangas", (req, res) => {
  // Récupération de tout les articles
  db.query(
    `SELECT * FROM articles WHERE titlemangas IS NOT NULL`,
    (err, data) => {
      //if (process.env.MODE === "test") res.json(obj);
      if (err) throw err;
      console.log("data", data);
      return res.render("pages/mangas", { data });
    }
  );
});

//////////////////////////////////////////////////////////////////////////////////////////////////////////////

app.get("/mdpoublie", async (req, res) => {
  res.render("pages/mdpoublie");
});

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
// post // put // delete
app.get("/profil", async (req, res) => {
  res.render("pages/profil", { layout: "user" });
});

//////////////////////////////////////////////////////////////////////////////////////////////////////////////

app.get("/404", async (req, res) => {
  res.render("pages/page404");
});

//////////////////////////////////////////////////////////////////////////////////////////////////////////////

app
  .route("/admin")
  .get(async (req, res) => {
    const user = await db.query(`SELECT * FROM users`);
    const categorie = await db.query("SELECT * FROM categories");
    const jeux = await db.query(
      "SELECT * FROM articles WHERE titlejeux IS NOT NULL"
    );
    const manga = await db.query(
      "SELECT * FROM articles WHERE titlemangas IS NOT NULL"
    );
    const film = await db.query(
      "SELECT * FROM articles WHERE titlefilms IS NOT NULL"
    );
    const serie = await db.query(
      "SELECT * FROM articles WHERE titleseries IS NOT NULL"
    );
    const booster = await db.query(
      "SELECT * FROM articles WHERE titlebooster IS NOT NULL"
    );
    const deck = await db.query(
      "SELECT * FROM articles WHERE titledeck IS NOT NULL"
    );

    //if (process.env.MODE === "test") res.json({ boosters, decks });
    //else
    res.render("pages/admin", {
      layout: "admin",
      booster,
      deck,
      user,
      categorie,
      jeux,
      manga,
      film,
      serie,
    });
  })
  // POST article
  .post((req, res) => {
    // Recuperation des données du formulaire
    const {
      text,
      titlejeux,
      titlemangas,
      titleseries,
      titlefilms,
      titlebooster,
      titledeck,
      datesorties,
      datefilms,
      parution,
      sortieserie,
      nbeps,
      version,
      nb,
      collection,
      picture,
      caroussel,
      lien_1,
      lien_2,
      lien_3,
      lien_4,
    } = req.body;
    db.query(
      `INSERT INTO articles (Id_articles, text, titlejeux, titleseries, titlefilms, id_user,type) VALUES ('${text}', DATE '${titlejeux}', '${titlemangas}', '${titleseries}','${titlefilms}','${titlebooster}', '${titledeck}', '${datesorties}', '${datefilms}', '${parution}', '${sortieserie}', '${nbeps}', '${version}', '${collection}', '${nb}', '${picture}', '${caroussel}', '${lien_1}','${lien_2}', '${lien_3}', '${lien_4}');`,
      function (err, data) {
        if (err) throw err;
        //if (process.env.MODE === 'test') res.json(data)
        // Redirection vers la page Admin
        else res.redirect("back");
      }
    );
  })
  // UPDATE ARTICLE
  .put (upload.single("edit_image"),(req, res) => {
    const {
      text,
      titlejeux,
      titlemangas,
      titleseries,
      titlefilms,
      titlebooster,
      titledeck,
      datesorties,
      datefilms,
      parution,
      sortieserie,
      nbeps,
      version,
      nb,
      collection,
      picture,
      caroussel,
      lien_1,
      lien_2,
      lien_3,
      lien_4,
    } = req.body;
    const { id } = req.params;
    if (
      text ||
      titlejeux ||
      titlemangas ||
      titleseries ||
      titlefilms ||
      titlebooster ||
      titledeck ||
      datesorties ||
      datefilms ||
      parution ||
      sortieserie ||
      nbeps ||
      version ||
      nb ||
      collection ||
      picture ||
      caroussel ||
      lien_1 ||
      lien_2 ||
      lien_3 ||
      lien_4 
    ) {
      
      db.query(
        `UPDATE articles SET text='${text}', titlejeux='${titlejeux}', titlemangas='${titlemangas}', titleseries='${titleseries}', titlefilms='${titlefilms}', titlebooster='${titlebooster}', titledeck='${titledeck}', datesorties= DATE ${datesorties}, datefilms = DATE ${datefilms},  parution ='${parution}', sortieserie ='${sortieserie}', nbeps = ${nbeps}, version ='${version}', nb = ${nb}, collection = ${collection}, picture = ${picture}, caroussel = ${caroussel}, lien_1 = ${lien_1}, lien_3 = ${lien_3}, lien_2 = ${lien_2}, lien_4 = ${lien_4}    WHERE id_article = ${id};`,
        function (err, data) {
          if (err) throw err;

          //if (process.env.MODE === "test") res.json(data);
          // Redirection vers la page Admin
          else res.redirect("back");
        }
      );
    } else if (req.file) {
      db.query(
        `SELECT picture from articles WHERE Id_articles=4`,
        function (err, data) {
          console.log("data", data);
          if (data[0].picture !== "default.png") {
            pathImg = path.resolve("public/img/" + data[0].picture);
            fs.unlink(pathImg, (err) => {
              if (err) throw err;
              console.log(req.file);
            });
          }
          db.query(
            `UPDATE articles SET picture ="${req.file.completed}" WHERE Id_articles=4`
          , function (err, data) {
            if (err) throw err;

            //if (process.env.MODE === "test") res.json(data);
            // Redirection vers la page Admin
            else res.redirect("back");
          });
        }
      );
    }
  })

  // DELETE ARTICLE
  .delete((req, res) => {
  const { id } = req.params;
  db.query(
    `DELETE FROM articles WHERE id_article=${id};`,
    function (err, data) {
      if (err) throw err;
      //if (process.env.MODE === 'test') res.json(data)
      // Redirection vers la page Admin
      else res.redirect("back");
    }
  );
});

//////////////////////////////////////////////////////////////////////////////////////////////////////////////

// On demarre notre app en lui demandant d'être à l'écoute du port
app.listen(PORT_NODE, () => console.log(`on port ${PORT_NODE}`));

module.exports = { db, app };
