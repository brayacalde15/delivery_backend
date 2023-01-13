Use udemy_delivery;


Create Table users(
id  BIGINT PRIMARY KEY AUTO_INCREMENT,
email VARCHAR(180)NOT NULL UNIQUE,
name VARCHAR (90) NOT NULL,
lastname VARCHAR(90)NOT NULL,
phone VARCHAR (90)NOT NULL UNIQUE ,
image VARCHAR(255)NULL,
password VARCHAR(90) NOT NULL,
confirmpassword VARCHAR(90)NOT NULL,
created_at timestamp(0)NOT NULL,
update_at timestamp(0)not null
);
Create table roles(
   id BIGINT PRIMARY KEY AUTO_INCREMENT ,
   name VARCHAR(90) NOT NULL UNIQUE ,
   image VARCHAR(255) NULL,
   route VARCHAR (180) NOT NULL,
   created_at TIMESTAMP(0) NOT NULL,
   update_at TIMESTAMP(0) Not null
   

);
INSERT INTO roles(
name,
route,
created_at,
update_at
)
VALUES(
"RESTAURANTE",
"/restaurant/orders/list",
"2022-10-2",
"2022-10-2"

);
INSERT INTO roles(
name,
route,
created_at,
update_at
)
VALUES(
"REPARTIDOR",
"/delivery/orders/list",
"2022-10-2",
"2022-10-2"

);
INSERT INTO roles(
name,
route,
created_at,
update_at
)
VALUES(
"CLIENTE",
"/client/products/list",
"2022-10-2",
"2022-10-2"

);


CREATE TABLE user_has_roles(
id_user BIGINT NOT NULL,
id_rol BIGINT NOT NULL ,
created_at TIMESTAMP(0) NOT NULL,
update_at TIMESTAMP(0)Not null,
FOREIGN KEY (id_user) REFERENCES users(id) ON UPDATE CASCADE ON DELETE CASCADE ,
FOREIGN KEY(id_rol) REFERENCES roles(id) ON UPDATE CASCADE ON DELETE CASCADE,
PRIMARY KEY  (id_user,id_rol)


);

CREATE TABLE categories(
id BIGINT PRIMARY KEY AUTO_INCREMENT,
name VARCHAR (180) NOT NULL,
description TEXT NOT NULL,
created_at TIMESTAMP(0)NOT NULL,
updated_at TIMESTAMP (0)NOT NULL
);

CREATE TABLE products(
id BIGINT PRIMARY KEY AUTO_INCREMENT,
name VARCHAR (180)NOT NULL UNIQUE,
description TEXT NOT NULL,
price DECIMAL NOT NULL,
image1 VARCHAR(255)NULL,
image2 VARCHAR (255) NULL,
image3 VARCHAR (255) NULL,
id_category BIGINT NOT NULL,
created_at TIMESTAMP(0) NOT NULL,
updated_at TIMESTAMP(0) NOT NULL,
FOREIGN KEY (id_category) REFERENCES categories(id)ON UPDATE CASCADE ON DELETE CASCADE
);