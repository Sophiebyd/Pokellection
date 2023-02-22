// import modules
const path = require('path');
const fs = require("fs");

// GET Admin
exports.getAdmin = async (req, res) => {
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
};

// POST Admin (ajouter)
exports.postAdmin = (req, res) => {
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
      //if (process.env.MODE === 'test') return res.json(data)
      // Redirection vers la page Admin
      else res.redirect("back");
    }
  );
};

//PUT admin (update)
exports.putAdmin = 
  (req, res) => {
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
    console.log("putAdmin");
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
      const {id} = req.params
      console.log('id', id)
      console.log('req.url', req.url);
      db.query(
        `SELECT picture from articles WHERE Id_articles=${id}`,
        function (err, [data]) {
          console.log("data", data);
          if (data.picture !== "default.png") {
            pathImg = path.resolve("public/img/" + data.picture);
            fs.unlink(pathImg, (err) => {
              if (err) throw err;
              console.log(req.file);
            });
          }
          db.query(
            `UPDATE articles SET picture ="${req.file.completed}" WHERE Id_articles=${id}`,
            function (err, data) {
              if (err) throw err;
              //if (process.env.MODE === "test") res.json(data);
              // Redirection vers la page Admin
              else res.redirect("back");
              console.log("data", data);
            }
          );
        }
      );
    }
  };

//DELETE admin
exports.deleteAdmin = (req, res) => {
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
};

