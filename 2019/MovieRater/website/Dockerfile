FROM php:8.2-apache
RUN docker-php-ext-install pdo pdo_mysql
RUN pecl install redis && docker-php-ext-enable redis

RUN apt-get update && apt-get install netcat-traditional python3 -y 
RUN useradd acid_burn
ADD ./user /home/
RUN chmod +rx /home/acid_burn
RUN chown acid_burn:acid_burn /home/acid_burn
RUN su acid_burn && gcc -o /home/acid_burn/getflag /home/acid_burn/getflag.c
RUN chmod 4755 /home/acid_burn/getflag
RUN chmod 400 /home/acid_burn/flag

