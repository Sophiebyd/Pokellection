const chaiHttp = require("chai-http"),
    chai = require('chai'),
    should = chai.should(),
    expect = chai.expect,
    { app } = require("../index"),
    path = require("path");

chai.use(chaiHttp);

//////////////////////////////////////////////////

describe("CHAI // CONTROLLER // Mangas", () => {

    // it(" ChaiRouter // GET // Articles", (done) => {
    //     console.log('Chai test')
    //     done()
    // })

    it(" ChaiRouter // GET //  Mangas", (done) => {
        chai
            .request(app)
            .get("/mangas")
            .end((err, res) => {
                if (err) return done(err);
                // Ici on demande à ce que res.body.articles doit être un 'array'
                res.body.articles.should.be.a("array");
                // Ici on demande à ce que res soit un status 200
                res.should.have.status(200);
                // Et le done() permet de cloturer notre test
                done();
            });
    });

    it(" ChaiRouter // POST // Articles", (done) => {
        chai
            .request(app)
            .post("/mangas")
            .end((err, res) => {
                if (err) return done(err);
                // Ici on demande à ce que res.body.articles doit être un 'tableau'
                res.body.articles.should.be.a("array");


                /* res.body.articles[0]
                *************************
                
                {
                    Id_articles: 1,
                    text: 'Mon super text',
                    title: 'Title',
                    subtitle: 'Subtitle',
                    created_at: '2023-02-03T09:03:22.000Z',
                    edited_at: '2023-02-03T09:03:22.000Z',
                    picture: '/assets/images/default.png',
                    Id_users: 1,
                    Id_categories: 1
                }

                 */

                // Ici on demande à ce que res.body.articles[0] doit être un 'objet'
                res.body.articles[0].should.be.a("object");
                // Ici on demande à ce que res.body.articles[0].Id_articles doit être un 'nombre'
                res.body.articles[0].Id_articles.should.be.a("number");
                // Ici on demande à ce que res soit un status 200
                res.should.have.status(200);
                // Et le done() permet de cloturer notre test
                done();
            });
    });

})

//////////////////////////////////////////////////////////////////////////