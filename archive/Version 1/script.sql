DROP TABLE IF EXISTS `users`;
CREATE TABLE users(
   Id_users INT AUTO_INCREMENT,
   last_name VARCHAR(50) NOT NULL,
   first_name VARCHAR(50) NOT NULL,
   pseudo VARCHAR(50) NOT NULL,
   mail VARCHAR(50) NOT NULL,
   password VARCHAR(250) NOT NULL,
   birthday DATE NOT NULL,
   created_at DATETIME NOT NULL,
   edited_at DATETIME NOT NULL,
   banned TINYINT NOT NULL ,
   PRIMARY KEY(Id_users),
   UNIQUE(pseudo),
   UNIQUE(mail)
);

DROP TABLE IF EXISTS `categories`;
CREATE TABLE categories(
   Id_categories INT AUTO_INCREMENT,
   name VARCHAR(50) NOT NULL,
   created_at DATETIME NOT NULL,
   edited_at DATETIME NOT NULL,
   picture BLOB NOT NULL,
   PRIMARY KEY(Id_categories),
   UNIQUE(name)
);

DROP TABLE IF EXISTS `articles`;
CREATE TABLE articles(
   Id_articles INT AUTO_INCREMENT,
   text LONGTEXT NOT NULL,
   title VARCHAR(50) NOT NULL,
   subtitle VARCHAR(50) NOT NULL,
   created_at DATETIME NOT NULL,
   edited_at DATETIME NOT NULL,
   picture BLOB NOT NULL,
   Id_users INT NOT NULL,
   Id_categories INT NOT NULL,
   PRIMARY KEY(Id_articles),
   FOREIGN KEY(Id_users) REFERENCES users(Id_users),
   FOREIGN KEY(Id_categories) REFERENCES categories(Id_categories)
);

DROP TABLE IF EXISTS `comments`;
CREATE TABLE comments(
   Id_comments INT AUTO_INCREMENT,
   text TEXT NOT NULL,
   edited_at DATETIME NOT NULL,
   reported BOOLEAN NOT NULL,
   created_at DATE NOT NULL,
   Id_users INT NOT NULL,
   Id_articles INT NOT NULL,
   PRIMARY KEY(Id_comments),
   FOREIGN KEY(Id_users) REFERENCES users(Id_users),
   FOREIGN KEY(Id_articles) REFERENCES articles(Id_articles)
);
