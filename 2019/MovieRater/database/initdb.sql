create database moviedb;
use moviedb;
create table moviedb.movies (id int, name VARCHAR(200),picture VARCHAR(200),rating FLOAT(3,2));
create table moviedb.comments_to_be_reviewed (movie_id VARCHAR(50), comment VARCHAR(500));

insert into moviedb.movies values (1,"Hackers","/img/1.jpg",4.2);
insert into moviedb.movies values (2,"Wargames","/img/2.jpg",3.9);
insert into moviedb.movies values (3,"Snowden","/img/3.jpg",4.1);
insert into moviedb.movies values (4,"Matrix","/img/4.jpg",2.3);
insert into moviedb.movies values (5,"Skyfall","/img/5.jpg",1.6);
insert into moviedb.movies values (6,"Minority Report","/img/6.jpg",0.3);
insert into moviedb.movies values (7,"The Fith Estate","/img/7.jpg",3.8);
insert into moviedb.movies values (8,"Black Hat","/img/8.jpg",0.1);

create user 'user'@'%' identified by 'user';
create user 'admin'@'%' identified by 'admin';

grant select on moviedb.movies to 'user'@'%';
grant insert on moviedb.comments_to_be_reviewed to 'user'@'%';

grant select on moviedb.movies to 'admin'@'%';
grant select on moviedb.comments_to_be_reviewed to 'admin'@'%';
grant insert on moviedb.comments_to_be_reviewed to 'admin'@'%';
grant delete on moviedb.comments_to_be_reviewed to 'admin'@'%';
grant file on *.* to 'admin'@'%';

flush privileges;