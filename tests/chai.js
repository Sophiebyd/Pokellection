// import de module

const chaiHttp = require("chai-http"),
  chai = require("chai"),
  should = chai.should(),
  expect = chai.expect,
  { app } = require("../index"),
  path = require("path");

chai.use(chaiHttp);

// Description de notre test
describe("CHAI // CONTROLLER // JEUXVIDEOS", () => {
  // Test Route GET Jeux Vidéos
  it("ChaiRouter // GET // Jeux Vidéos", (done) => {
    // Nous appelons chai avec .request(app) afin de venir cherher les routes de notre application
    chai
      .request(app)
      // Ensuite nous stipulons la route
      .get("/jeuxvideos")
      // Et enfin nous allons pouvoir checker le format de notre réponse
      .end((err, res) => {
        if (err) return done(err);
        console.log("get jeux vidéos", res.body);
        // Ici on demande à ce que res soit un status 200
        res.should.have.status(200);
        // Ici on demande à ce que res soit de type HTML
        res.should.be.html;
        done();
      });
  });
});

const request = require("supertest");

describe("PUT /admin/games/:id", () => {
  it("should update a game in the database", (done) => {
    request(app)
      .put("/admin/games/1")
      .send({
        text: "new text",
        titlejeux: "new title",
        datesorties: "2023-04-16",
        version: "new version",
        lien_1: "new link 1",
        lien_2: "new link 2",
        lien_3: "new link 3",
        lien_4: "new link 4",
      })
      .expect(302)
      .end((err, res) => {
        if (err) return done(err);
        done();
      });
  });
});

