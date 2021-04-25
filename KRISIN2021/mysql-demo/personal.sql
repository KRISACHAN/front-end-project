CREATE TABLE IF NOT EXISTS personal (
  id INT(10) NOT NULL AUTO_INCREMENT,
  account VARCHAR(16) DEFAULT NULL,
  nickname VARCHAR(10) DEFAULT NULL,
  sex TINYINT(1) DEFAULT NULL,
  birthday DATE DEFAULT NULL,
  description VARCHAR(200) DEFAULT NULL,
  is_deleted BOOLEAN DEFAULT NULL,
  create_date DATETIME DEFAULT NULL,
  update_date DATETIME DEFAULT NULL,
  delete_date DATETIME DEFAULT NULL,
  PRIMARY KEY (id),
  UNIQUE KEY account (account)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4;