//import des modules
const bcrypt = require('bcrypt');
const bcrypt_salt = 10;
const { mailSend } = require("../utils/nodeMailer");

// GET home page categories
exports.getHomePage = (req, res) => {
  // Récupération de tout les articles
  db.query(`SELECT * FROM categories`, (err, data) => {
    //if (process.env.MODE === "test") res.json(obj);
    if (err) throw err;
    console.log("data", data);
    return res.render("pages/home", { data });
  });
};

// GET contact page
exports.getContact = (req, res) => {
  res.render("pages/contact");
};

// POST contact mail
exports.postContactMail = (req, res) => {
  const { lastname, firstname, email, subject, message } = req.body;
  mailSend(
    `${lastname} ${firstname} <${email}>`,
    `email <${process.env.MAIL_USER}>`,
    subject,
    `${email} ${message}`,
    async function (err, info) {
      if (err) throw err;
      console.log(info);
      res.redirect("/");
    }
  );
};

//GET connexion de compte
exports.getConnexion = (req, res) => {
  res.render("pages/connexion");
};

// POST connexion de compte
exports.postConnexion =('/connexion', (req, res) => {
  // Récupération du formulaire de connexion
  const { pseudo, password } = req.body
  console.log(req.body);

  // On va chercher dans la db si le mail existe
  db.query(`SELECT * FROM users WHERE pseudo="${pseudo}"`, function (err, data) {
    if (err) throw err;

    // On stock notre resultat[0] qui sera notre user ayant le mail correspondant
    let user = data[0]
    console.log('user data', user);
    // Si l'on a aucun user ayant ce mail
    if (!user) return res.render('pages/connexion', { flash: "Ce compte n'existe pas" })

    // On viens comparer notre password du formulaire avec le hash de l'user correspondant au mail dans la db
    // la function compare hash le password pour le comparer avec le hash passer en parametre (user.password)
    bcrypt.compare(password, user.password, function (err, result) {
      // Si le mot de passe ne correspond pas
      if (!result) return res.render('/connexion', { flash: "L\'email ou le mot de passe n\'est pas correct !" })
      else {
        // On assigne les data voulu dans la session
        req.session.user = {
          pseudo: user.pseudo,
          email: user.mail,
          id: user.Id_users,
          is_admin: user.isAdmin
        };
        res.redirect('/')
      }
    });
  })
})

//GET création de compte
exports.getCreateAccount = (req, res) => {
  res.render("pages/creation");
};

// POST création de compte
exports.postCreateAccount = ("/creation", (req, res) => {
    // Récupération du formulaire de création de compte
    const { firstname, lastname, email, password, confirm_password, pseudo, birthday } = req.body;
    console.log('req body creation', req.body)

    // Ici l'on pourrais checker en back si le password est égale au passwordConfirm
    if(password !== confirm_password) return res.redirect('/creation')

    // On check si l'on a bien les informations que l'on a besoin
    if (!firstname || !lastname || !email || !password || !pseudo || !birthday)
    return res.redirect("/");
    // On hash notre password avant de l'enregistrer dans la DB
    bcrypt.hash(password, bcrypt_salt, function (err, hash) {
      // Notre requête SQL pour enregistrer notre user dans la DB
      db.query(
        `INSERT INTO users SET last_name="${lastname}", first_name="${firstname}", mail="${email}", pseudo="${pseudo}", birthday="${birthday}", password="${hash}", isAdmin=0`,
        function (err, data) {
          if (err) throw err;
          res.redirect("/connexion");
        }
      );
    });
  });

//GET mdp oublié
exports.getForgotPassword = (req, res) => {
  res.render("pages/mdpoublie");
};

//GET profil
exports.getProfil = (req, res) => {
  res.render("pages/profil", { layout: "user" });
};

//POST logout
exports.postLogout = function (req, res) {
  console.log("Clear Cookie session :", req.session.user.id)
  req.session.destroy(() => {
      res.clearCookie('screenmaze-cookie')
      res.redirect('/')
  })
}

//GET 404
exports.get404 = (req, res) => {
  res.render("pages/page404");
};
