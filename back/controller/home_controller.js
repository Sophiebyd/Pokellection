// GET home page 
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
  }

//GET connexion de compte
exports.getConnexion = (req, res) => {
    res.render("pages/connexion");
  };

//GET création de compte
exports.getCreateAccount = (req, res) => {
    res.render("pages/creation");
  };

//GET mdp oublié
exports.getForgotPassword = (req, res) => {
    res.render("pages/mdpoublie");
  };

//GET profil
exports.getProfil = (req, res) => {
    res.render("pages/profil", { layout: "user" });
  };

//GET 404
exports.get404 = (req, res) => {
    res.render("pages/page404");
  };