create database miley;
use miley;

create table miley.messages (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  message VARCHAR(2000)
); 

create user 'miley'@'%' identified by 'miley';
grant select on miley.messages to 'miley'@'%';
grant insert on miley.messages to 'miley'@'%';
grant delete on miley.messages to 'miley'@'%';

flush privileges;
