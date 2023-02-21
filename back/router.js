const express = require("express"),
  router = express.Router();

const upload = require("./config/other/multer");


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
.get(getContact)
.post(postContactMail);

// jeux vidéo liste pages
router.route("/jeuxvideos")
.get(getJeuxVideosPage);

// cartes liste pages
router.route("/cartes")
.get(getCartesPage);

// connexion 
router.route("/connexion")
.get(getConnexion);

// création de compte 
router.route("/creation")
.get(getCreateAccount);

// animes liste pages
router.route("/animes")
.get(getAnimesPage);

// series article (par id)
router.route("/series/:id")
.get(getSeriesArticle);

// films article (par id)
router.route("/films/:id")
.get(getFilmsArticle);

// mangas article (par id)
router.route("/mangas/:id")
.get(getMangasArticle);

// boosters article (par id)
router.route("/boosters/:id")
.get(getBoostersArticle);

// decks article (par id)
router.route("/decks/:id")
.get(getDecksArticle);

// jeux vidéos article (par id)
router.route("/jeux/:id")
.get(getJeuxVideosArticle);

// mangas liste pages
router.route("/mangas")
.get(getMangas);

// page mdp oublié 
router.route("/mdpoublie")
.get(getForgotPassword);

// page profil
router.route("/profil")
.get(getProfil);
  
// page 404
router.route("/404")
.get(get404);

// page Admin
router.route("/admin")
  .get(getAdmin)

// POST article
  .post(postAdmin)

  // UPDATE ARTICLE
  .put(upload.single("edit_image"), putAdmin)

  // DELETE ARTICLE
  .delete(deleteAdmin);

// Exports de notre router
module.exports = router;

