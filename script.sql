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
      titlejeux VARCHAR(250),
      titlemangas VARCHAR(250),
      titleseries VARCHAR(250),
      titlefilms VARCHAR(250),
      titlebooster VARCHAR(250),
      titledeck VARCHAR(250),
      datesorties DATE,
      datefilms DATE,
      parution VARCHAR(250),
      version VARCHAR(50),
      nb INT,
      collection VARCHAR(250),
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
VALUES   ('jeuxvideos', 'https://cdn.idealo.com/folder/Product/201415/8/201415852/s4_produktbild_max/legendes-pokemon-arceus-switch.jpg'),
         ('mangas', 'https://www.rightstufanime.com/images/productImages/9781421596266_manga-pokemon-omega-ruby-alpha-sapphire-volume-5-primary.jpg'),
         ('animes', 'https://www.pokebip.com/images/2016/627.jpg'),
         ('cartes', 'https://images-na.ssl-images-amazon.com/images/I/A1aZWd780wL._AC_SL1500_.jpg');

INSERT INTO articles (text, titlejeux, datesorties, version, picture, Id_users, Id_categories)
VALUES   ('lorem lorem lorem', 'Ecarlate / Violet', '2022-11-08','Switch', 'https://www.pokepedia.fr/images/thumb/d/dc/Jaquette_de_Pok%C3%A9mon_%C3%89carlate.png/1200px-Jaquette_de_Pok%C3%A9mon_%C3%89carlate.png',1,1),	
         ('lorem lorem lorem', 'Légendes Pokémon', '2022-01-28','Switch', 'https://www.pokepedia.fr/images/thumb/0/02/Jaquette_de_L%C3%A9gendes_Pok%C3%A9mon_Arceus.png/1200px-Jaquette_de_L%C3%A9gendes_Pok%C3%A9mon_Arceus.png',1,1),	
         ('lorem lorem lorem', 'Diamant Etincelant / Perle Scintillante', '2021-11-19','Switch', 'https://www.pokepedia.fr/images/thumb/8/8e/Jaquette_de_Pok%C3%A9mon_Diamant_%C3%89tincelant.png/800px-Jaquette_de_Pok%C3%A9mon_Diamant_%C3%89tincelant.png',1,1),	
         ('lorem lorem lorem', 'DLC Epée / Bouclier', '2020-06-17','Switch', 'https://m.media-amazon.com/images/I/81e-cI1WXTL._AC_SL1500_.jpg',1,1),	
         ('lorem lorem lorem', 'Epée / Bouclier', '2019-11-15','Switch', 'https://m.media-amazon.com/images/I/81YYjENP+EL._AC_SL1500_.jpg',1,1),	
         ('lorem lorem lorem', 'Lets go Pikachu / Evoli', '2018-11-16','Switch', 'https://m.media-amazon.com/images/I/81QKGapo1UL._AC_SY500_.jpg',1,1),	
         ('lorem lorem lorem', 'Ultra Soleil - Ultra Lune', '2017-11-17','3DS', 'https://m.media-amazon.com/images/I/818MNsl62QL._AC_SL1500_.jpg',1,1),	
         ('lorem lorem lorem', 'Soleil / Lune', '2016-11-16','3DS', 'https://m.media-amazon.com/images/I/818MNsl62QL._AC_SL1500_.jpg',1,1),	
         ('lorem lorem lorem', 'Rubis Oméga / Saphir Alpha', '2014-11-28','3DS', 'https://static.actu.fr/uploads/2014/12/CdC-sem-01.jpg',1,1),	
         ('lorem lorem lorem', 'X / Y', '2013-10-12','3DS', 'https://global-img.gamergen.com/pokmon-x-cover-boxart-jaquette-3ds_01F401C900394096.jpg',1,1),	
         ('lorem lorem lorem', 'Noir 2 / Blanc 2', '2012-10-12','DS', 'https://www.pokepedia.fr/images/thumb/8/82/Jaquette_de_Pok%C3%A9mon_version_Noire_2.jpeg/200px-Jaquette_de_Pok%C3%A9mon_version_Noire_2.jpeg',1,1),	
         ('lorem lorem lorem', 'Noir / Blanc', '2011-03-04','DS', 'https://www.pokepedia.fr/images/thumb/c/c8/Pok%C3%A9mon_Noir_Recto.png/1200px-Pok%C3%A9mon_Noir_Recto.png',1,1),
         ('lorem lorem lorem', 'Or HeartGold / Argent SoulSilver', '2010-03-26','DS', 'https://www.pokepedia.fr/images/a/a8/Pok%C3%A9mon_Or_HeartGold_Recto.png',1,1),
         ('lorem lorem lorem', 'Platine', '2009-05-26','DS', 'https://www.pokepedia.fr/images/a/a8/Pok%C3%A9mon_Or_HeartGold_Recto.png',1,1),
         ('lorem lorem lorem', 'Diamant / Perle', '2007-07-27','DS',  'https://www.pokepedia.fr/images/thumb/3/3b/Pok%C3%A9mon_Perle_Recto.png/200px-Pok%C3%A9mon_Perle_Recto.png',1,1),
         ('lorem lorem lorem', 'Emeraude', '2005-10-21','GBA',  'https://www.pokepedia.fr/images/thumb/2/24/Pok%C3%A9mon_%C3%89meraude_Recto.png/1200px-Pok%C3%A9mon_%C3%89meraude_Recto.png',1,1),
         ('lorem lorem lorem', 'Rouge-Feu / Vert-Feuille', '2004-10-01','GBA',  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT_jLIHmrGFsK8GGOcunAEj8AtyzzJ-pUKgNvF9it9wJNjIq6xvd3R4jFO_rh56Sc5fbiM&usqp=CAU',1,1),
         ('lorem lorem lorem', 'Rubis / Saphir', '2003-07-25','GBA',  'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse3.mm.bing.net%2Fth%3Fid%3DOIP.GCpp5vZT73pnLovGJdiaDQHaHa%26pid%3DApi&f=1&ipt=ca328157b99d10ccb7a6f537a417237560b883111e3fcc2dc88abeb02824d25a&ipo=images',1,1),
         ('lorem lorem lorem', 'Cristal', '2001-11-02','3DS/GBC',  'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fmedia.senscritique.com%2Fmedia%2F000017577771%2Fsource_big%2FPokemon_Cristal.png&f=1&nofb=1&ipt=318caaab9fe1c8bc437de384cf2fc39dc1c1524ba295412f47fabf35f33c592a&ipo=images',1,1),
         ('lorem lorem lorem', 'Or / Argent', '2001-05-06','3DS/GBC',  'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.S7jS84L9pn0uYLIcmrxwmAHaGj%26pid%3DApi&f=1&ipt=7b383982d4a3ea8e93ad9a1b75c33117acd37857e76bfbfa4ea028179afcce7a&ipo=images',1,1),
         ('lorem lorem lorem', 'Jaune', '2000-06-06','3DS/GBC',  'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse3.explicit.bing.net%2Fth%3Fid%3DOIP.dJgC1ARrkoAgPbm9Wcs-vQHaHV%26pid%3DApi&f=1&ipt=c8fc4745cc776f4f11de21a3a0e1071b328e52f81cb2a41a4d8fe65eb3c561e1&ipo=images',1,1),
         ('lorem lorem lorem', 'Rouge / Vert / Bleu', '1999-10-08','GB',  'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse3.mm.bing.net%2Fth%3Fid%3DOIP.D4-h50ji3ajee-Wx_q6S0gHaGo%26pid%3DApi&f=1&ipt=59a168f4adb50ee9733479ccd93581757d947799b1dc0753c2550f001507682d&ipo=images',1,1);

INSERT INTO articles (text, titlemangas, parution, nb, picture, Id_users, Id_categories)
VALUES   ('lorem lorem lorem', 'Pokémon Try Adventure', '2010 - 2011', 3,'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fcdn.anime-planet.com%2Fmanga%2Fprimary%2Fpokemon-try-adventure-1.jpg%3Ft%3D1625830637&f=1&nofb=1&ipt=23b25bcab65c6b1f9ad12cc509768f467a4f39ef86d5019320b2704720c608f2&ipo=images',1,2),	
         ('lorem lorem lorem', 'Pokemon Card ni Natta Wake', '22 mai 1999 - sep 2001', 6,'https://cdn.myanimelist.net/images/manga/5/112345.jpg',1,2),	
         ('lorem lorem lorem', 'Pokémon Get da ze!', '1998 - 2002', 5,'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.UliaLjLGQgK-LKvEAyEI4wHaKo%26pid%3DApi&f=1&ipt=9c1eff776c6f7f7ffae525cf7ca9160b752f323383e6f2a4ce4530c3ecd62906&ipo=images',1,2),	
         ('lorem lorem lorem', 'Pokémon Pocket Monsters', 'nov 1996 - 28 avr 2003', 14,'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fmedia.pokemoncentral.it%2Fwiki%2Fa%2Fab%2FPok%25C3%25A9mon_Pocket_Monsters_JP_volume_1.png&f=1&nofb=1&ipt=ad3a9495b490dea9c78dc990d6f38258e82f9518316aa9379d84c94e147b75c5&ipo=images',1,2),	
         ('lorem lorem lorem', 'Pokémon DP: Pocket Monsters Diamond Pearl Monogatari', '27 fev 2007 - 28 oct 2009', 8,'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fmedia.pocketmonsters.net%2Fdvd%2F240%2Fmain.png%2Ft%2F400.png&f=1&nofb=1&ipt=cb85bb10b5fb723f0d10e5d5183176400aab5e79db74a72286c470d304f887c4&ipo=images',1,2),	
         ('lorem lorem lorem', 'Pocket Monsters ReBURST', '9 mars 2011 - 10 oct 2012', 8,'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.explicit.bing.net%2Fth%3Fid%3DOIP.7UwABJap-RIrHPlccB505wAAAA%26pid%3DApi&f=1&ipt=32a1b9bbfeb936d63e442736d8fe8194c1a6cf606328898badb5c17105c19818&ipo=images',1,2),	
         ('lorem lorem lorem', 'Satoshi to Pikachu', '1997 - 2006', 16,'https://cdn.myanimelist.net/images/manga/4/156351.jpg',1,2),	
         ('lorem lorem lorem', 'Pocket Monsters DP', '2006 - 2009', 5,'https://cdn.myanimelist.net/images/manga/4/156351.jpg',1,2),	
         ('lorem lorem lorem', 'Dengeki! Pikachu', 'avr 1997 - dec 1999', 14,'https://cdn.myanimelist.net/images/manga/4/155945.jpg',1,2),	
         ('lorem lorem lorem', 'Pocket Monsters: PiPiPi★Adventure', '3 juin 1997 - 28 dec 2002', 10,'https://cdn.myanimelist.net/images/manga/5/200375.jpg',1,2),	
         ('lorem lorem lorem', 'Pokémon HGSS', '2010 - ?', 2,'https://cdn.myanimelist.net/images/manga/1/79143.jpg',1,2),	
         ('lorem lorem lorem', 'Pocket Monsters BW-hen', '26 aout 2011 - 28 aout 2013', 4,'https://cdn.myanimelist.net/images/manga/1/142905.jpg',1,2),	
         ('lorem lorem lorem', 'Pocket Monsters: Ruby-Sapphire-hen', 'aout 2003 - mai 2006', 10,'https://cdn.myanimelist.net/images/manga/2/36634.jpg',1,2),	
         ('lorem lorem lorem', 'Pocket Monsters Kin Gin: Golden Boys', 'nov 1999 - sep 2001', 10,'https://cdn.myanimelist.net/images/manga/2/25836.jpg',1,2),	
         ('lorem lorem lorem', 'Pocket Monsters XY-hen', '29 juin 2013 - 30 aout 2016', 10,'https://cdn.myanimelist.net/images/manga/2/142851.jpg',1,2);	

INSERT INTO articles (text, titleseries, parution, nb, picture, Id_users, Id_categories)
VALUES   ('lorem lorem lorem', 'Pokémon', '1 avr 1997 - 14 nov 2022', 276,'https://cdn.myanimelist.net/images/anime/13/73834.jpg',1,3),	
         ('lorem lorem lorem', 'Pokemon XY & Z', '22 mai 1999 - sep 2001', 47,'https://cdn.myanimelist.net/images/anime/1599/94412.jpg',1,3), 	
         ('lorem lorem lorem', 'Pokémon Advanced Generation', '21 nov 2002 - 14 sep 2006', 192,'https://cdn.myanimelist.net/images/anime/1759/97378.jpg',1,3), 	
         ('lorem lorem lorem', 'Pokémon XY', '17 oct 2013 - 22 oct 2015', 93,'https://cdn.myanimelist.net/images/anime/12/54549.jpg',1,3), 	
         ('lorem lorem lorem', 'Pokémon Best Wishes!', '23 sep 2010 - 14 juin 2012', 84,'https://cdn.myanimelist.net/images/anime/7/26135.jpg',1,3), 	
         ('lorem lorem lorem', 'Pokémon Sun & Moon', '17 nov 2016 - 3 nov 2019', 146,'https://cdn.myanimelist.net/images/anime/11/84673.jpg',1,3), 	
         ('lorem lorem lorem', 'Pokemon: The Origin', '2 oct 2013', 4,'https://cdn.myanimelist.net/images/anime/7/53701.jpg',1,3), 	
         ('lorem lorem lorem', 'Pokemon Best Wishes! Season 2: Episode N', '17 jan 2013 - 18 avr 2013', 14,'https://cdn.myanimelist.net/images/anime/7/45749.jpg',1,3), 	
         ('lorem lorem lorem', 'Pokemon Best Wishes! Season 2', '21 juin 2012 - 10 jan 2013', 24,'https://cdn.myanimelist.net/images/anime/1227/113635.jpg',1,3), 	
         ('lorem lorem lorem', 'Pokemon Housoukyoku', '3 dec 2002 - 28 sep 2004', 16,'https://cdn.myanimelist.net/images/anime/1227/113635.jpg',1,3), 	
         ('lorem lorem lorem', 'Pokemon Diamond & Pearl', '28 sep 2006 - 9 sep 2010', 151,'https://cdn.myanimelist.net/images/anime/13/25749.jpg',1,3); 

INSERT INTO articles (text, titlefilms, datefilms, picture, Id_users, Id_categories)
VALUES   ('lorem lorem lorem', 'Pokemon Movie 01: Mewtwo no Gyakushuu', '1998-07-18','https://cdn.myanimelist.net/images/anime/13/65699.jpg',1,3),	
         ('lorem lorem lorem', 'Pokemon Movie 02: Maboroshi no Pokemon Lugia Bakutan', '1999-07-17','https://cdn.myanimelist.net/images/anime/1599/94412.jpg',1,3),
         ('lorem lorem lorem', 'Pokemon Movie 03: Kesshoutou no Teiou Entei', '2000-07-08','https://cdn.myanimelist.net/images/anime/7/80288.jpg',1,3),
         ('lorem lorem lorem', 'Pokemon Movie 04: Celebi Toki wo Koeta Deai', '2001-07-07','https://cdn.myanimelist.net/images/anime/2/41799.jpg',1,3),
         ('lorem lorem lorem', 'Pokemon Movie 05: Mizu no Miyako no Mamorigami Latias to Latios', '2002-07-13','https://cdn.myanimelist.net/images/anime/2/21317.jpg',1,3),
         ('lorem lorem lorem', 'Pokemon Movie 06: Nanayo no Negaiboshi Jirachi', '2003-07-19','https://cdn.myanimelist.net/images/anime/13/75733.jpg',1,3),
         ('lorem lorem lorem', 'Pokemon Movie 07: Rekkuu no Houmonsha Deoxys', '2004-07-17','https://cdn.myanimelist.net/images/anime/9/21313.jpg',1,3),
         ('lorem lorem lorem', 'Pokemon Movie 08: Mew to Hadou no Yuusha Lucario', '2005-07-19','https://cdn.myanimelist.net/images/anime/6/79257.jpg',1,3),
         ('lorem lorem lorem', 'Pokemon Movie 09: Pokemon Ranger to Umi no Ouji Manaphy', '2005-07-15','https://cdn.myanimelist.net/images/anime/10/23168.jpg',1,3),
         ('lorem lorem lorem', 'Pokemon Movie 10: Dialga vs. Palkia vs. Darkrai', '2007-07-15','https://cdn.myanimelist.net/images/anime/1119/94419.jpg',1,3),
         ('lorem lorem lorem', 'Pokemon Movie 11: Giratina to Sora no Hanataba Sheimi', '2008-07-19','https://cdn.myanimelist.net/images/anime/3/21316.jpg',1,3),
         ('lorem lorem lorem', 'Pokemon Movie 12: Arceus Choukoku no Jikuu e', '2008-07-18','https://cdn.myanimelist.net/images/anime/8/21315.jpg',1,3),
         ('lorem lorem lorem', 'Pokemon Movie 13: Genei no Hasha Zoroark', '2010-07-10','https://cdn.myanimelist.net/images/anime/5/26915.jpg',1,3),
         ('lorem lorem lorem', 'Pokemon Movie 14 White: Victini to Kuroki Eiyuu Zekrom', '2011-07-16','https://cdn.myanimelist.net/images/anime/13/29620.jpg',1,3),
         ('lorem lorem lorem', 'Pokemon Movie 15: Kyurem vs. Seikenshi', '2012-07-14','https://cdn.myanimelist.net/images/anime/11/38311.jpg',1,3),
         ('lorem lorem lorem', 'Pokemon Movie 16: Shinsoku no Genosect - Mewtwo Kakusei', '2013-07-13','https://cdn.myanimelist.net/images/anime/9/47615.jpg',1,3),
         ('lorem lorem lorem', 'Pokemon Movie 17: Hakai no Mayu to Diancie', '2014-07-14','https://cdn.myanimelist.net/images/anime/13/59743.jpg',1,3),
         ('lorem lorem lorem', 'Pokemon Movie 18: Ring no Choumajin Hoopa', '2015-07-18','https://cdn.myanimelist.net/images/anime/4/72143.jpg',1,3),
         ('lorem lorem lorem', 'Pokemon Movie 19: Volcanion to Karakuri no Magearna', '2016-07-16','https://cdn.myanimelist.net/images/anime/3/78818.jpg',1,3),
         ('lorem lorem lorem', 'Pokemon Movie 20: Kimi ni Kimeta!', '2017-07-15','https://cdn.myanimelist.net/images/anime/1402/122043.jpg',1,3),
         ('lorem lorem lorem', 'Pokemon Movie 21: Minna no Monogatari', '2018-07-13','https://cdn.myanimelist.net/images/anime/1580/90795.jpg',1,3),
         ('lorem lorem lorem', 'Pokemon Movie 22: Mewtwo no Gyakushuu Evolution', '2019-07-12','https://cdn.myanimelist.net/images/anime/1207/99489.jpg',1,3),
         ('lorem lorem lorem', 'Pokemon Movie 23: Koko', '2020-12-25','https://cdn.myanimelist.net/images/anime/1207/99489.jpg',1,3);

INSERT INTO articles (text, titlebooster, collection, picture, Id_users, Id_categories)
VALUES   ('lorem lorem lorem', 'Tempête Argentée', 'Epée/Bouclier','https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcThsftLoA4ZVvyhj5ZEC-3x2EDrP0u8fgvOW3WnYc5SOuRJuE3c',1,4),	
         ('lorem lorem lorem', 'Origine Perdue', 'Epée/Bouclier','https://nintendalerts.com/wp-content/uploads/2022/06/Cartes-Pokemon-Booster-EB11-Origine-Perdue-3.jpg',1,4),	
         ('lorem lorem lorem', 'Astres Radieux', 'Epée/Bouclier','https://m.media-amazon.com/images/I/71ftnns0PgL._AC_SY550_.jpg',1,4),	
         ('lorem lorem lorem', 'Règne de Glace', 'Epée/Bouclier','https://m.media-amazon.com/images/I/71NzjGm+d4L._AC_SL1429_.jpg',1,4),	
         ('lorem lorem lorem', 'Voltage Eclatant', 'Epée/Bouclier','https://tcg.pokemon.com/assets/img/expansions/vivid-voltage/collections/fr-fr/bdb-detail-5.png',1,4),	
         ('lorem lorem lorem', 'Ténèbres Embrasées', 'Epée/Bouclier','https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ-z3xrCjKkMe7WtOY7gwwnnWUpKprdBs7JrvJ1AZCkcQx0SwA7R67ccTG5GlLZfEiiJm4&usqp=CAU',1,4),	
         ('lorem lorem lorem', 'Clash des Rebelles', 'Epée/Bouclier','https://m.media-amazon.com/images/I/71F1G2nlXfL._AC_SL1429_.jpg',1,4),	
         ('lorem lorem lorem', 'Epée et Bouclier', 'Epée/Bouclier','https://m.media-amazon.com/images/I/71F1G2nlXfL._AC_SL1429_.jpg',1,4);	
         