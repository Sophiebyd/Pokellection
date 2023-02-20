const express = require("express"),
  router = express.Router();

// import controller
const {getHomePage, getContact, postContactMail, getConnexion, getCreateAccount, getForgotPassword, getProfil, get404} = require("./controller/home_controller");
const {getJeuxVideosPage, getCartesPage, getAnimesPage, getSeriesArticle, getFilmsArticle, getMangasArticle, getBoostersArticle, getDecksArticle, getJeuxVideosArticle, getMangas} = require("./controller/articles_controller");
const {getAdmin, postAdmin, putAdmin, deleteAdmin} = require("./controller/admin_controller");
const { test } = require("./middleware");

// Home page
router.route("/")
.get(test, getHomePage);

// Contact
router.route("/contact")
.get(test, getContact)
.post(test, postContactMail);

// jeux vidéo liste pages
router.route("/jeuxvideos")
.get(test, getJeuxVideosPage);

// cartes liste pages
router.route("/cartes")
.get(test, getCartesPage);

// connexion 
router.route("/connexion")
.get(test, getConnexion);

// création de compte 
router.route("/creation")
.get(test, getCreateAccount);

// animes liste pages
router.route("/animes")
.get(test, getAnimesPage);

// series article (par id)
router.route("/series/:id")
.get(test, getSeriesArticle);

// films article (par id)
router.route("/films/:id")
.get(test, getFilmsArticle);

// mangas article (par id)
router.route("/mangas/id")
.get(test, getMangasArticle);

// boosters article (par id)
router.route("/boosters/:id")
.get(test, getBoostersArticle);

// decks article (par id)
router.route("/decks/:id")
.get(test, getDecksArticle);

// jeux vidéos article (par id)
router.route("/jeux/:id")
.get(test, getJeuxVideosArticle);

// mangas liste pages
router.route("/mangas")
.get(test, getMangas);

// page mdp oublié 
router.route("/mdpoublie")
.get(test, getForgotPassword);

// page profil
router.route("/profil")
.get(test, getProfil);
  
// page 404
router.route("/404")
.get(test, get404);

// page Admin
router.route("/admin")
  .get(test, getAdmin)

// POST article
  .post(test, postAdmin)

  // UPDATE ARTICLE
  .put(test, putAdmin )

  // DELETE ARTICLE
  .delete(test, deleteAdmin);

// Exports de notre router
module.exports = router;

