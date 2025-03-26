FROM php:8.2-apache
RUN apt update && apt install ncat gcc python3 -y
RUN pecl install redis && docker-php-ext-enable redis
RUN a2enmod dump_io
RUN docker-php-ext-install mysqli pdo pdo_mysql
#COPY app/ /var/www/html/

RUN apt-get update && apt-get install netcat-traditional -y 
RUN useradd acid_burn
ADD ./user /home/
RUN chmod +rx /home/acid_burn
RUN chown acid_burn:acid_burn /home/acid_burn
RUN su acid_burn && gcc -o /home/acid_burn/getflag /home/acid_burn/getflag.c
RUN chmod 4755 /home/acid_burn/getflag
RUN chmod 400 /home/acid_burn/flag
