//GET jeux vidéos pages
exports.getJeuxVideosPage = (req, res) => {
  db.query(
    `SELECT * FROM articles WHERE titlejeux IS NOT NULL`,
    (err, data) => {
      if (process.env.MODE === "test") {
        return res.json(data);
      } else {
        if (err) throw err;
        console.log("data", data);
        return res.render("pages/jeuxvideos", { data });
      }
    }
  );
};

//GET cartes pages
exports.getCartesPage = async (req, res) => {
    const boosters = await db.query(
      "SELECT * FROM articles WHERE titlebooster IS NOT NULL"
    );
    const decks = await db.query(
      "SELECT * FROM articles WHERE titledeck IS NOT NULL"
    );
    //if (process.env.MODE === "test") res.json({ boosters, decks });
    //else
    res.render("pages/cartes", { boosters, decks });
  }

// GET animes pages
exports.getAnimesPage = async (req, res) => {
    const films = await db.query(
      "SELECT * FROM articles WHERE titlefilms IS NOT NULL"
    );
    const series = await db.query(
      "SELECT * FROM articles WHERE titleseries IS NOT NULL"
    );
    if (process.env.MODE === "test") res.json({ films, series });
    else
    res.render("pages/animes", { films, series });
  }

// GET series article par ID
exports.getSeriesArticle = (req, res) => {
    const { id } = req.params;
    // Récupération de tout les articles
    db.query(`SELECT * FROM articles WHERE Id_articles=${id}`, (err, data) => {
      //if (process.env.MODE === "test") res.json(obj);
      if (err) throw err;
      console.log("data", data);
      return res.render("pages/id_series", { data: data[0] });
    });
  };

// GET films article par ID
exports.getFilmsArticle = (req, res) => {
    const { id } = req.params;
    // Récupération de tout les articles
    db.query(`SELECT * FROM articles WHERE Id_articles=${id}`, (err, data) => {
      //if (process.env.MODE === "test") res.json(obj);
      if (err) throw err;
      console.log("data", data);
      return res.render("pages/id_films", { data: data[0] });
    });
  };

// GET mangas article par ID
exports.getMangasArticle = (req, res) => {
    const { id } = req.params;
    // Récupération de tout les articles
    db.query(`SELECT * FROM articles WHERE Id_articles=${id}`, (err, data) => {
      //if (process.env.MODE === "test") res.json(obj);
      if (err) throw err;
      console.log("data", data);
      return res.render("pages/id_mangas", { data: data[0] });
    });
  };

// GET Boosters article par ID
exports.getBoostersArticle = (req, res) => {
    // Récupération de tout les articles
    const { id } = req.params;
    db.query(`SELECT * FROM articles WHERE Id_articles=${id}`, (err, data) => {
      //if (process.env.MODE === "test") res.json(obj);
      if (err) throw err;
      console.log("data", data);
      return res.render("pages/id_boosters", { data: data[0] });
    });
  };

// GET Decks article par ID
exports.getDecksArticle = (req, res) => {
    const { id } = req.params;
    // Récupération de tout les articles
    db.query(`SELECT * FROM articles WHERE Id_articles=${id}`, (err, data) => {
      //if (process.env.MODE === "test") res.json(obj);
      if (err) throw err;
      console.log("data", data);
      return res.render("pages/id_decks", { data: data[0] });
    });
  };

// GET Jeux Videos article par ID
exports.getJeuxVideosArticle = (req, res) => {
    const { id } = req.params;
    // Récupération de tout les articles
    db.query(`SELECT * FROM articles WHERE Id_articles=${id}`, (err, data) => {
      //if (process.env.MODE === "test") res.json(obj);
      if (err) throw err;
      console.log("data", data);
      return res.render("pages/id_jeux", { data: data[0] });
    });
  };

// GET Mangas article 
exports.getMangas = (req, res) => {
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
  };
