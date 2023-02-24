const express = require("express"),
  router = express.Router();

const upload = require("./config/other/multer");


// import controller
const {getHomePage, putHomePage, deleteCategories, getContact, postContactMail, getConnexion, postCreateAccount, getCreateAccount, getForgotPassword, getProfil, postLogout, get404, postConnexion} = require("./controller/home_controller");
const {getJeuxVideosPage, getCartesPage, getAnimesPage, getSeriesArticle, getFilmsArticle, getMangasArticle, getBoostersArticle, getDecksArticle, getJeuxVideosArticle, getMangas} = require("./controller/articles_controller");
const {getAdmin, postAdmin, putAdmin, deleteAdmin} = require("./controller/admin_controller");
const { test } = require("./middleware");

// Home page
router.route("/")
.get(test, getHomePage)
.put(putHomePage)
.delete(deleteCategories)
// POST logout
.post(postLogout);

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
.get(getConnexion)
.post(postConnexion);

// création de compte 
router.route("/creation")
.get(getCreateAccount)
.post(postCreateAccount);

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
  
  // DELETE ARTICLE
  .delete(deleteAdmin);

// admin with params url (id)
router.route("/admin/:id")
// UPDATE ARTICLE
.put(upload.single("edit_image"), putAdmin)


// Exports de notre router
module.exports = router;

