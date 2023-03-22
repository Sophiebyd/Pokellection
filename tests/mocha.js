const assert = require("assert");
const { db } = require("../index");

// GET ALL
// données en entrée
// -> rien
// données attendues
// -> Article[]
// données obtenues
// -> Article[] === req.data.dbArticle

// POST Article
// données en entrée
// -> {Article}
// données attendues
// -> { insertId, ... }
// données obtenues
// -> { insertId, ... } === req.data.article

// POST -> GET* -> GETID -> (test jointure) -> UPDATE -> DELETE

console.log("process test", process.env.MODE);

describe("MOCHA // CRUD // Articles", () => {
  let user, category, article, comment;
  
  ////// TEST
  it("TEST // ", (done) => {
    done(assert.deepEqual(6, 3 * 2));
  });

  ////// GET ALL Article
  it("GET // ALL Article ", (done) => {
    let sql = `SELECT * FROM articles`;
    db.query(sql, (err, data) => {
      if (err) throw err;
      done(assert.equal(typeof [], typeof data));
    });
  });

  ////// GET ALL Comments
  it("GET // ALL Comment ", (done) => {
    let sql = `SELECT * FROM comments`;
    db.query(sql, (err, data) => {
      if (err) throw err;
      done(assert.equal(typeof [], typeof data));
    });
  });
});
