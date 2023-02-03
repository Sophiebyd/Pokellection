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

  // // function qui ce lance avant chaque test
  // // ordre de lancement: beforeEach -> it(1) // beforeEach -> it(2)
  // beforeEach((done) => {
  //     console.log('BeforeEach')
  //     // db.query(`INSERT INTO articles SET title="testunitaire", price="5", image="default.png"`, function (err, data, fields) {
  //     //     if (err) throw err;
  //     //     com.id = data.insertId;
  //     //     assert.strictEqual('number', typeof data.insertId)
  //         done()
  //     // })
  // });

  ////// TEST
  it("TEST // ", (done) => {
    done(assert.deepEqual(6, 3 * 2));
  });

  ////// POST Users
  it("POST // Users ", (done) => {
    let sql = `
            INSERT INTO users 
                (last_name, first_name, pseudo, mail, password )
            VALUES 
                ( 'hell', 'christ', 'Christhell-${Date.now()}', 'christ-${Date.now()}@hell.com', '123456'  );
        `;

    db.query(sql, (err, data) => {
      if (err) throw err;
      console.log(typeof data, data);
      done(assert.equal(typeof data.insertId, "number"));

      db.query(
        `SELECT * FROM users WHERE Id_users = ${data.insertId}`,
        (err, data) => {
          user = data[0];
        }
      );
    });
  });

  ////// GET ALL Users
  it("GET // ALL Users ", (done) => {
    let sql = `SELECT * FROM users`;
    db.query(sql, (err, data) => {
      if (err) throw err;
      done(assert.equal(typeof [], typeof data));
    });
  });

  ////// GET By ID Users
  it("GET // By ID Users ", (done) => {
    let sql = `SELECT * FROM users WHERE Id_users = ${user.Id_users}`;
    db.query(sql, (err, data) => {
      if (err) throw err;
      done(assert.equal(typeof {}, typeof data[0]));
    });
  });

  ////// LEFT JOIN Users & comments
  it("Left Join // Users and comments", (done) => {
    let sql = `
        SELECT comments.text, users.id_users 
        FROM users 
        LEFT JOIN comments
        ON comments.Id_comments = users.Id_users
    `;

    db.query(sql, (err, result) => {
      if (err) throw err;
      console.log("Left Join Result", result);
      done(assert.notEqual(0, result.length));
    });
  });

  ////// PUT Users
  it("PUT // Users ", (done) => {
    let sql = `
            UPDATE users 
            SET 
                last_name='Edit-${Date.now()}',
                first_name='Edit-${Date.now()}',
                pseudo='Edit-${Date.now()}',
                mail='Edit-${Date.now()}',
                password='edit-mot-de-passe'
            WHERE Id_users = ${user.Id_users};
        `;

    db.query(sql, (err, data) => {
      if (err) throw err;
      console.log(typeof data, data);
      done(assert.equal(typeof data.insertId, "number"));

      // db.query(`SELECT * FROM users WHERE Id_users = ${data.insertId}`, (err, data) => {
      //     // user = data[0]
      // })
    });
  });

  ////// POST Categories
  it("POST // Category ", (done) => {
    let sql = `
            INSERT INTO categories 
                (name, picture)
            VALUES 
                ( 'Test-${Date.now()}', '/assets/images/default.png');
        `;

    db.query(sql, (err, data) => {
      if (err) throw err;
      console.log(typeof data, data);
      done(assert.equal(typeof data.insertId, "number"));

      db.query(
        `SELECT * FROM categories WHERE Id_categories = ${data.insertId}`,
        (err, data) => {
          category = data[0];
        }
      );
    });
  });

  ////// GET ALL Categories
  it("GET // ALL Categories ", (done) => {
    let sql = `SELECT * FROM categories`;
    db.query(sql, (err, data) => {
      if (err) throw err;
      done(assert.equal(typeof [], typeof data));
    });
  });

  ////// GET By ID Categories
  it("GET // By ID Categories ", (done) => {
    let sql = `SELECT * FROM categories WHERE Id_categories = ${category.Id_categories}`;
    db.query(sql, (err, data) => {
      if (err) throw err;
      done(assert.equal(typeof {}, typeof data[0]));
    });
  });

  ////// INNER JOIN Categories & users
  it("Inner Join // Categories and Users", (done) => {
    let sql = `
        SELECT categories.created_at, users.pseudo 
        FROM categories 
        INNER JOIN users
        ON categories.Id_categories = users.Id_users
    `;

    db.query(sql, (err, result) => {
      if (err) throw err;
      console.log("Inner Join Result", result);
      done(assert.notEqual(0, result.length));
    });
  });

    //PUT categories
    it("PUT // categories", (done) => {
        let sql = `
                UPDATE categories
                SET 
                  name = 'salut'
                WHERE Id_categories = ${category.Id_categories};
              `;
        let updatedcategories = "This is the updated categories";
    
        db.query(sql, [updatedcategories], (err, result) => {
          if (err) throw err;
          console.log("PUT Result", result);
          done(assert.equal(result.affectedRows, 1));
        });
      });
    

  ////// POST Article
  it("POST // Article ", (done) => {
    console.log("dzefze", user, category);
    let sql = `
            INSERT INTO articles 
                (text, title, picture, Id_users, Id_categories)
            VALUES 
                ( 'Mon super text', 'Title', '/assets/images/default.png', '${user.Id_users}', '${category.Id_categories}' );
        `;

    db.query(sql, (err, data) => {
      if (err) throw err;
      console.log(typeof data, data);
      done(assert.equal(typeof data.insertId, "number"));

      db.query(
        `SELECT * FROM articles WHERE Id_articles = ${data.insertId}`,
        (err, data) => {
          article = data[0];
        }
      );
    });
  });

  ////// GET ALL Article
  it("GET // ALL Article ", (done) => {
    let sql = `SELECT * FROM articles`;
    db.query(sql, (err, data) => {
      if (err) throw err;
      done(assert.equal(typeof [], typeof data));
    });
  });

  ////// GET By ID article
  it("GET // By ID articles ", (done) => {
    let sql = `SELECT * FROM articles WHERE Id_articles = ${article.Id_articles}`;
    db.query(sql, (err, data) => {
      if (err) throw err;
      done(assert.equal(typeof {}, typeof data[0]));
    });
  });

  ////// RIGHT JOIN Article & categories
  it("Right Join // Article and categories", (done) => {
    let sql = `
        SELECT articles.title, categories.name 
        FROM articles 
        LEFT JOIN categories
        ON articles.Id_articles = categories.Id_categories
    `;

    db.query(sql, (err, result) => {
      if (err) throw err;
      console.log("Right Join Result", result);
      done(assert.notEqual(0, result.length));
    });
  });

    //PUT articles
    it("PUT // Articles", (done) => {
        let sql = `
                UPDATE articles
                SET 
                  text = 'salut',
                  title = 'pokémon'
                WHERE Id_articles = ${article.Id_articles};
              `;
        let updatedarticles = "This is the updated articles";
    
        db.query(sql, [updatedarticles], (err, result) => {
          if (err) throw err;
          console.log("PUT Result", result);
          done(assert.equal(result.affectedRows, 1));
        });
      });
    
  ////// POST Comments
  it("POST // Comment ", (done) => {
    let sql = `
            INSERT INTO comments 
                (text, reported, Id_users, Id_articles)
            VALUES 
                ( 'Mon super comment', 0, ${user.Id_users} , ${article.Id_articles});
        `;

    db.query(sql, (err, data) => {
      if (err) throw err;
      console.log(typeof data, data);
      done(assert.equal(typeof data.insertId, "number"));

      db.query(
        `SELECT * FROM comments WHERE Id_articles = ${data.insertId}`,
        (err, data) => {
          comment = data[0];
        }
      );
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

  ////// GET By ID Comments
  it("GET // By ID Comments ", (done) => {
    let sql = `SELECT * FROM comments WHERE Id_comments = ${comment.Id_comments}`;
    db.query(sql, (err, data) => {
      if (err) throw err;
      done(assert.equal(typeof {}, typeof data[0]));
    });
  });

    ////// CROSS JOIN Comments & users
    it("CROSS Join // Comments and users", (done) => {
        let sql = `
            SELECT comments.text, users.first_name 
            FROM users
            CROSS JOIN comments
        `;
    
        db.query(sql, (err, result) => {
          if (err) throw err;
          console.log("Cross Join Result", result);
          done(assert.notEqual(0, result.length));
        });
      });

  //PUT Comments
  it("PUT // Comments", (done) => {
    let sql = `
            UPDATE comments
            SET 
              text = 'salut'
            WHERE Id_comments = ${comment.Id_comments};
          `;
    let updatedComment = "This is the updated comment";

    db.query(sql, [updatedComment], (err, result) => {
      if (err) throw err;
      console.log("PUT Result", result);
      done(assert.equal(result.affectedRows, 1));
    });
  });

  // ////// Delete Users
  // it("Delete // Users ", (done) => {
  //     let sql = `
  //             DELETE from users
  //             WHERE Id_users = ${user.Id_users};
  //         `;

  //     db.query(sql, (err, data) => {
  //         if (err) throw err;
  //         console.log('DELETE', typeof data, data)

  //         db.query(`SELECT * FROM users WHERE Id_users = ${data.insertId}`, (err, data) => {
  //             done(assert.deepEqual(0, data.length))
  //         })
  //     })
  // });

  // ////// Delete Categories
  // it("Delete // Categories ", (done) => {
  //    let sql = `
  //            DELETE FROM categories
  //        `;
  //    db.query(sql, (err, result) => {
  //        if (err) throw err;
  //        console.log('DELETE', typeof result, result)
  //
  //        db.query(`SELECT * FROM categories`, (err, data) => {
  //            if (err) throw err;
  //            done(assert.deepEqual(0, data.length))
  //        })
  //    })
  //});
  
   ////// Delete Articl
  // it("Delete // Articles ", (done) => {
  //    let sql = `
  //            DELETE FROM articles
  //        `;
  //    db.query(sql, (err, result) => {
  //        if (err) throw err;
  //        console.log('DELETE', typeof result, result)
  
  //        db.query(`SELECT * FROM articles`, (err, data) => {
  //            if (err) throw err;
  //            done(assert.deepEqual(0, data.length))
  //        })
  //    })
  //});

  // ////// Delete Comments
  // it("Delete // Categories ", (done) => {
  //    let sql = `
  //            DELETE FROM categories
  //        `;
  //    db.query(sql, (err, result) => {
  //        if (err) throw err;
  //        console.log('DELETE', typeof result, result)
  //
  //        db.query(`SELECT * FROM categories`, (err, data) => {
  //            if (err) throw err;
  //            done(assert.deepEqual(0, data.length))
  //        })
  //    })
  //});
});
