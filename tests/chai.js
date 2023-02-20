// import de module

const chaiHttp = require("chai-http"),
  chai = require("chai"),
  should = chai.should(),
  expect = chai.expect,
  { app } = require("../index"),
  path = require("path");

chai.use(chaiHttp);

// Description de notre test
describe("CHAI // CONTROLLER // ANIMES", () => {
  // On définit des variables à utiliser plus tard
  let id;

  // Test Route POST Articles
  it(" ChaiRouter // GET // Animes", (done) => {
    // Nous appelons chai avec .request(app) afin de venir cherher les routes de notre application
    chai
      .request(app)
      // Ensuite nous stipulons la route
      .get("/animes")
      // Et enfin nous allons pouvoir checker le format de notre réponse
      .end((err, res) => {
        if (err) return done(err);
        console.log("get animes", res.body);
        // Ici on demande à ce que res.body.articles doit être un 'array'
        res.body.should.be.a("object");
        res.body.films.should.be.a("array");
        res.body.series.should.be.a("array");
        // Ici on demande à ce que res soit un status 200
        res.should.have.status(200);
        // Et le done() permet de cloturer notre test
        done();
      });
  });
});


// Description de notre test
describe("CHAI // CONTROLLER // JEUX VIDEOS", () => {
  // On définit des variables à utiliser plus tard
  let id;

  // Test Route GET Articles
  it(" ChaiRouter // GET // Jeux vidéos", (done) => {
    // Nous appelons chai avec .request(app) afin de venir cherher les routes de notre application
    chai
      .request(app)
      // Ensuite nous stipulons la route
      .get("/jeuxvideos")
      // Et enfin nous allons pouvoir checker le format de notre réponse
      .end((err, res) => {
        if (err) return done(err);
        console.log("get jeux", res.body);
        // Ici on demande à ce que res.body.articles doit être un 'array'
        res.body.should.be.a("array");
        // Ici on demande à ce que res soit un status 200
        res.should.have.status(200);
        // Et le done() permet de cloturer notre test
        done();
      });
  });
});