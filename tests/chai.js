const chaiHttp = require("chai-http"),
    chai = require('chai'),
    should = chai.should(),
    expect = chai.expect,
    { app } = require("../index"),
    path = require("path");

chai.use(chaiHttp);

//////////////////////////////////////////////////////////////////////////

//describe("CHAI // CONTROLLER // Mangas", () => {

    // it(" ChaiRouter // GET // Articles", (done) => {
    //     console.log('Chai test')
    //     done()
    // })

//    it(" ChaiRouter // GET //  articles", (done) => {
//        chai
//            .request(app)
//            .get("/mangas")
//            .end((err, res) => {
//                if (err) return done(err);
//                // Ici on demande à ce que res.body.articles doit être un 'array'
//                res.body.articles.should.be.a("array");
//                // Ici on demande à ce que res soit un status 200
//                res.should.have.status(200);
//                // Et le done() permet de cloturer notre test
//                done();
//            });
//    });

//    it(" ChaiRouter // POST // Articles", (done) => {
//        chai
//            .request(app)
//            .post("/mangas")
//            .end((err, res) => {
//                if (err) return done(err);
//                // Ici on demande à ce que res.body.articles doit être un 'tableau'
//                res.body.articles.should.be.a("array");


                /* res.body.articles[0]
//                *************************
//                
//                {
//                    Id_articles: 1,
//                    text: 'Mon super text',
//                    title: 'Title',
//                    subtitle: 'Subtitle',
//                    created_at: '2023-02-03T09:03:22.000Z',
//                    edited_at: '2023-02-03T09:03:22.000Z',
//                    picture: '/assets/images/default.png',
//                    Id_users: 1,
//                    Id_categories: 1
//                }
//
//                 */
//
//                // Ici on demande à ce que res.body.articles[0] doit être un 'objet'
//                res.body.articles[0].should.be.a("object");
//                // Ici on demande à ce que res.body.articles[0].Id_articles doit être un 'nombre'
//                res.body.articles[0].Id_articles.should.be.a("number");
//                // Ici on demande à ce que res soit un status 200
//                res.should.have.status(200);
//                // Et le done() permet de cloturer notre test
//                done();
//            });
//    });
//
//})

//////////////////////////////////////////////////////////////////////////

// Description de notre test
describe("CHAI // CONTROLLER // Categories", () => {
    // On définit des variables à utiliser plus tard
    //let id;

    // Test Route POST Articles
    it(" ChaiRouter // GET // Articles", (done) => {
        // Nous appelons chai avec .request(app) afin de venir cherher les routes de notre application
        chai
            .request(app)
            // Ensuite nous stipulons la route
            .get("/mangas")
            // Et enfin nous allons pouvoir checker le format de notre réponse
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

    // Test Route POST Login
//    it(" ChaiRouter // POST // Login", (done) => {
//        chai
//            .request(app)
//            .post("/login")
//            .set("Accept", "application/json")
//            .send({email: "admin@admin.mail", password: "admin"})
//            .end((err, res) => {
//                cookieSess = res.res.headers['set-cookie'][0].split(';')[0]
//                if (err) return done(err);
//                res.should.have.status(200);
//                done();
//            });
//    });

    // Test Route POST Articles
//    it(" ChaiRouter // POST // Articles", (done) => {
//        chai
//            .request(app)
//            .post("/article")
//            .set("Accept", "application/json")
//            .set('Cookie', cookieSess)
//            .field("Content-Type", "multipart/form-data")
//            .field("title", "mon title")
//            .field("price", "9")
//            .attach("art_image", path.resolve(__dirname, "./img.png"))
//            .end((err, res) => {
//                if (err) return done(err);
//                res.body.id.should.be.a("number");
//                id = res.body.id
//                res.should.have.status(200);
//                done();
//            });
//    });

    // // Test Route GET Articles ID
//    it(" ChaiRouter // GET // ID Articles", (done) => {
//        chai
//            .request(app)
//            .get(`/article/${id}`)
//            .set("Accept", "application/json")
//            .set('Cookie', cookieSess)
//            .end((err, res) => {
//                if (err) return done(err);
//                res.should.have.status(200);
//                done();
//            });
//    });

    // // Test Route PUT Articles
//    it(" ChaiRouter // PUT // Articles", (done) => {
       
//        chai
//            .request(app)
//            .put(`/article/${id}`)
//            .set("Accept", "application/json")
//            .set('Cookie', cookieSess)
//            .field("Content-Type", "multipart/form-data")
//            .field("title", "Bruno Edit Chai")
//            .field("price", "909")
//            .attach("edit_image", path.resolve(__dirname, "./img_edit.jpg"))
//            .end((err, res) => {
//                if (err) return done(err);
//                res.should.have.status(200);
//                done();
//            });
//    });

    // // Test Route DELETE Articles
//    it(" ChaiRouter // DELETE // Articles ID", (done) => {
//        chai
//            .request(app)
//            .delete(`/article/${id}`)
//            .set("Accept", "application/json")
//            .set('Cookie', cookieSess)
//            .end((err, res) => {
//                if (err) return done(err);
//                res.should.have.status(200);
//                done();
//            });
//    });
});