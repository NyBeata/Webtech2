create table user(
    id int primary key AUTO_INCREMENT,
    name varchar(250),
    email varchar(50),
    password varchar(250),
    status varchar(20),
    role varchar(20),
    UNIQUE (email)
);

insert into user(name,email,password,status,role) values ('Admin','admin@gmail.com','admin','true','admin');

create table dlc(
    id int NOT NULL AUTO_INCREMENT,
    name varchar(255) NOT NULL,
    primary key(id)
);

create table animal(
    id int NOT NULL AUTO_INCREMENT,
    name varchar(255) NOT NULL,
    dlcId integer NOT NULL,
    description varchar(255),
    status varchar(20),
    primary key(id)
);