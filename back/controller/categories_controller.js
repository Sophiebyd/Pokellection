// import modules
const path = require("path");
const fs = require("fs");

// POST home page categories
exports.postHomePage = (req, res) => {
  const { post_categories } = req.body;
  console.log("post categories req.body", req.body);
  if (req.file) {
    let image;
    image = req.file.filename;
  } else {
    image = "default.jpg";
  }
  db.query(
    `INSERT INTO categories (name, picture) VALUES ("${post_categories}", "${req.file.filename}")`,
    function (err, data) {
      if (err) {
        throw err;
      } else {
        res.redirect("back");
      }
    }
  );
};

// PUT home page categories
exports.putHomePage = (req, res) => {
  const { name_categories } = req.body;
  const { id } = req.params;

  console.log("put categories req.body", req.body);
  console.log("put categories req.params", req.params);

  if (name_categories) {
    db.query(
      `UPDATE categories SET name='${name_categories}' WHERE Id_categories = ${id}`,
      function (err, data) {
        if (err) {
          throw err;
        } else {
          //if (process.env.MODE === "test") res.json(data);
          // Redirection vers la page Admin
          res.redirect("back");
        }
      }
    );
  }
  if (req.file) {
    const { id } = req.params;
    console.log("id", req.params);

    db.query(
      `SELECT picture from categories WHERE Id_categories=${id}`,
      function (err, [data]) {
        console.log("data", data);

        if (data.picture !== "default.png") {
          pathImg = path.resolve("public/img/" + data.picture);

          fs.unlink(pathImg, (err) => {
            if (err) {
              throw err;
            } else {
              console.log(req.file);
            }
          });
        }

        db.query(
          `UPDATE categories SET picture ='${req.file.completed}' WHERE Id_categories=${id}`,
          function (err, data) {
            if (err) {
              throw err;
            } else {
              //if (process.env.MODE === "test") res.json(data);
              // Redirection vers la page Admin
              console.log("data", data);
              res.redirect("back");
            }
          }
        );
      }
    );
  }
};

// Delete categories
exports.deleteCategories = (req, res) => {
  const { id } = req.params;
  console.log("req param delete", req.params);
  db.query(
    `DELETE FROM categories WHERE Id_categories=${id}`,
    function (err, data) {
      if (err) throw err;
      //if (process.env.MODE === 'test') res.json(data)
      // Redirection vers la page Admin
      else res.redirect("back");
    }
  );
};
