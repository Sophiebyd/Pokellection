// import modules
const path = require("path");


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
  console.log("categorie", categorie);
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

// Delete games
exports.deleteArticles = (req, res) => {
  const { id } = req.params;
  console.log("req param delete", req.params);
  db.query(
    `DELETE FROM articles WHERE Id_articles=${id}`,
    function (err, data) {
      if (err) throw err;
      //if (process.env.MODE === 'test') res.json(data)
      // Redirection vers la page Admin
      else res.redirect("back");
    }
  );
};