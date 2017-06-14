CREATE TABLE `mainBuilding`.`suggestion` (
  `idsuggestion` INT NOT NULL AUTO_INCREMENT,
  `suggestionTitle` VARCHAR(60) NULL,
  `suggestionText` VARCHAR(150) NULL,
  `suggestionIsDelete` TINYINT(4) NULL,
  PRIMARY KEY (`idsuggestion`));