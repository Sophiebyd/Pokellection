const express = require("express"),
router = express.Router();
const upload = require("./config/other/multer");


// import controller
const {getHomePage, getContact, postContactMail, getConnexion, postCreateAccount, getCreateAccount, getForgotPassword, getProfil, postLogout, get404, postConnexion} = require("./controller/home_controller");
const {getJeuxVideosPage, getCartesPage, getAnimesPage, getSeriesArticle, getFilmsArticle, getMangasArticle, getBoostersArticle, getDecksArticle, getJeuxVideosArticle, getMangas} = require("./controller/articles_controller");
const {getAdmin, deleteArticles} = require("./controller/admin_controller");
const {postHomePage, putHomePage, deleteCategories} = require("./controller/categories_controller");
const {putGames, postGames} = require("./controller/games_controller");
const {putMangas, postMangas} = require("./controller/mangas_controller");

const { test, checkLayout } = require("./middleware");

router.use(checkLayout)

// Home page
router.route("/")
.get(test, getHomePage)
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

router.route("/admin/:id")
  .delete(deleteArticles)

// CRUD Admin games par ID
router.route("/admin/games/:id")
.put(upload.single("edit_image"), putGames)

// POST Admin games 
router.route("/admin/games")
.post(upload.single("ajout_image"), postGames)

// CRUD Categories par ID
router.route("/admin/categories/:id")
.put(upload.single("edit_image"), putHomePage)
.delete(deleteCategories)

// POST Categories 
router.route("/admin/categories")
.post(upload.single("ajout_image"), postHomePage)

// CRUD Admin mangas par ID
router.route("/admin/mangas/:id")
.put(upload.single("edit_image"), putMangas)

// CRUD Admin mangas
router.route("/admin/mangas")
.post(upload.single("ajout_image"), postMangas)

// Exports de notre router
module.exports = router;

