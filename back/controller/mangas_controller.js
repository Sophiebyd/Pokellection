// import modules
const path = require("path");
const fs = require("fs");

// POST Games
exports.postMangas = (req, res) => {
  const { text, titlemangas, parution, nb, lien_1, lien_2, lien_3, lien_4 } = req.body;
  console.log("post games req.body", req.body);
  if (req.file) {
    let picture;
    picture = req.file.filename;
  } else {
    picture = "default.jpg";
  }
  db.query(
    `INSERT INTO articles (text, titlemangas, parution, nb, picture, lien_1, lien_2, lien_3, lien_4, Id_users, Id_categories) VALUES ("${text}","${titlemangas}", "${parution}", ${nb}, "${req.file.filename}", "${lien_1}","${lien_2}","${lien_3}","${lien_4}", "${req.session.user.id}", 2)`,
    function (err, data) {
      if (err) {
        throw err;
      } else {
        res.redirect("back");
      }
    }
  );
};

//PUT Mangas
exports.putMangas = (req, res) => {
  const { text, titlemangas, parution, nb, lien_1, lien_2, lien_3, lien_4 } =
    req.body;
  const { id } = req.params;
  console.log("putAdminMangas", req.body);
  if ((text, titlemangas, parution, nb, lien_1, lien_2, lien_3, lien_4)) {
    db.query(
      `UPDATE articles SET text = '${text}', 
          titlemangas = '${titlemangas}', 
          parution = '${parution}', 
          nb = '${nb}', 
          lien_1 = '${lien_1}', 
          lien_2 = '${lien_2}', 
          lien_3 = '${lien_3}', 
          lien_4 = '${lien_4}'
            WHERE Id_articles = ${id}`,
      function (err, data) {
        if (err) throw err;
        //if (process.env.MODE === "test") res.json(data);
        // Redirection vers la page Admin
        else res.redirect("back");
      }
    );
  } else if (req.file) {
    const { id } = req.params;
    console.log("id", id);
    console.log("req.url", req.url);
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
