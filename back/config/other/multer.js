// Import de Multer
const multer = require("multer");

// Ici nous définissons la config de stockage de multer
const storage = multer.diskStorage({
  // Ici la destination (ou seront stocker nos fichiers par default)
  destination: (req, file, cb) => {
    console.log(file);
    cb(null, "./public/img");
  },
  // Ici est définit le format du nom de l'image à stocker
  filename: (req, file, cb) => {
    const nameFile = file.originalname;
    const splited = nameFile.split(".");
    const ext = splited[splited.length - 1];
    const completed = splited[0] + "-" + Date.now() + "." + ext;

    file.completed = completed;

    cb(null, completed);
  },
});

// Ici seront initialiser les parametre de la config de multer
const upload = multer({
  // Ici nous renseignons le stockage definit au dessu
  storage: storage,
  // Ici seront renseigner les limits des fichiers (taile, proportion, ...)
  limits: {
    files: 1,
  },
  // Ici nous avons un filtre qui va nous permetre de configurer les extensions accepter par notre middleware ou autre
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype === "image/png" ||
      file.mimetype === "image/jpg" ||
      file.mimetype === "image/jpeg"
    ) {
      cb(null, true);
    } else {
      cb(null, false);
      cb(new Error("Le fichier doit être au format png, jpg, jpeg ou gif."));
    }
  },
});

// Ici nous exportons upload afin de pouvoir l'appeler dans notre router
module.exports = upload;
