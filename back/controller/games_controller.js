// import modules
const path = require("path");
const fs = require("fs");

// POST Games (add)
exports.postGames = (req, res) => {
  const {
    text,
    titlejeux,
    datesorties,
    version,
    lien_1,
    lien_2,
    lien_3,
    lien_4,
  } = req.body;
  console.log("post games req.body", req.body);
  let image = "default.jpg";
  if (req.file) {
    image = req.file.filename;
  }
  db.query(
    `INSERT INTO articles (text, titlejeux, datesorties, version, picture, lien_1, lien_2, lien_3, lien_4, Id_users, Id_categories) VALUES ("${text}","${titlejeux}", "${datesorties}","${version}", "${image}", "${lien_1}","${lien_2}","${lien_3}","${lien_4}", "${req.session.user.id}", 4)`,
    function (err, data) {
      if (err) {
        throw err;
      } else {
        res.redirect("back");
      }
    }
  );
};

//PUT games (update)
exports.putGames = (req, res) => {
  const {
    text,
    titlejeux,
    datesorties,
    version,
    lien_1,
    lien_2,
    lien_3,
    lien_4,
  } = req.body;
  const { id } = req.params;
  console.log("putAdmin", req.body);
  if ((text, titlejeux, datesorties, version, lien_1, lien_2, lien_3, lien_4)) {
    db.query(
      `UPDATE articles SET text = '${text}', 
        titlejeux = '${titlejeux}', 
        datesorties = '${datesorties}', 
        version = '${version}', 
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

