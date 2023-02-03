DROP DATABASE IF EXISTS `db`;

CREATE DATABASE IF NOT EXISTS `db`;

USE `db`;

DROP TABLE IF EXISTS `users`;

CREATE TABLE
   users (
      Id_users INT AUTO_INCREMENT,
      last_name VARCHAR(50) NOT NULL,
      first_name VARCHAR(50) NOT NULL,
      pseudo VARCHAR(50) NOT NULL,
      mail VARCHAR(50) NOT NULL,
      password VARCHAR(250) NOT NULL,
      birthday DATE,
      created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
      edited_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      banned TINYINT NOT NULL DEFAULT 0,
      PRIMARY KEY (Id_users),
      UNIQUE (pseudo),
      UNIQUE (mail)
   );

DROP TABLE IF EXISTS `categories`;

CREATE TABLE
   categories (
      Id_categories INT AUTO_INCREMENT,
      name VARCHAR(50) NOT NULL,
      created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
      edited_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      picture VARCHAR(250) NOT NULL,
      PRIMARY KEY (Id_categories),
      UNIQUE (name)
   );

DROP TABLE IF EXISTS `articles`;

CREATE TABLE
   articles (
      Id_articles INT AUTO_INCREMENT,
      text LONGTEXT NOT NULL,
      title VARCHAR(50) NOT NULL,
      created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
      edited_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      picture VARCHAR(250),
      Id_users INT NOT NULL,
      Id_categories INT NOT NULL,
      PRIMARY KEY (Id_articles),
      FOREIGN KEY (Id_users) REFERENCES users (Id_users) ON DELETE CASCADE,
      FOREIGN KEY (Id_categories) REFERENCES categories (Id_categories) ON DELETE CASCADE
   );

DROP TABLE IF EXISTS `comments`;

CREATE TABLE
   comments (
      Id_comments INT AUTO_INCREMENT,
      text TEXT NOT NULL,
      reported TINYINT,
      created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
      edited_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      Id_users INT NOT NULL,
      Id_articles INT NOT NULL,
      PRIMARY KEY (Id_comments),
      FOREIGN KEY (Id_users) REFERENCES users (Id_users) ON DELETE CASCADE,
      FOREIGN KEY (Id_articles) REFERENCES articles (Id_articles) ON DELETE CASCADE
   );

INSERT INTO users (last_name, first_name, pseudo, mail, password, birthday)
VALUES   ('albert', 'baguette', 'albag', 'albert.baguette@gmail.com', '12345', '1995-04-12'),
         ('carole', 'denis', 'caro', 'carole.denis@gmail.com', '456789', '1985-08-24'),
         ('elodie', 'françois', 'elofran', 'elodie.françois@gmail.com', '456542', '1990-01-02'),
         ('gauthier', 'hercule', 'hero', 'gauthier.hercule@gmail.com', '454122', '1984-11-17');

INSERT INTO categories (name, picture)
VALUES   ('jeuxvidéo', 'https://cdn.idealo.com/folder/Product/201415/8/201415852/s4_produktbild_max/legendes-pokemon-arceus-switch.jpg'),
         ('mangas', 'https://www.rightstufanime.com/images/productImages/9781421596266_manga-pokemon-omega-ruby-alpha-sapphire-volume-5-primary.jpg'),
         ('animes', 'https://www.pokebip.com/images/2016/627.jpg'),
         ('cartes', 'https://images-na.ssl-images-amazon.com/images/I/A1aZWd780wL._AC_SL1500_.jpg');

INSERT INTO articles (text, title, picture,Id_users, Id_categories )
VALUES   ('lorem lorem lorem', 'Pokémon Arceus', 'https://www.pokebip.com/images/2016/627.jpg',4 ,3),
         ('lorem lorem lorem', 'Pokémon Ruby', 'https://www.pokebip.com/images/2016/627.jpg',2 ,1),
         ('lorem lorem lorem', 'Pokémon X', 'https://www.pokebip.com/images/2016/627.jpg',1 ,4),
         ('lorem lorem lorem', 'Pokémon Y', 'https://www.pokebip.com/images/2016/627.jpg',3 ,2);

INSERT INTO comments (text, reported, Id_users, Id_articles )
VALUES   ('lorem lorem lorem', 0,4 ,3),
         ('lorem lorem lorem', 0,2 ,1),
         ('lorem lorem lorem', 1,1 ,4),
         ('lorem lorem lorem', 0,3 ,2);
