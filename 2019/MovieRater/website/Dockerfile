FROM php:7.2-apache
RUN docker-php-ext-install pdo pdo_mysql

RUN apt-get update && apt-get install netcat-traditional python -y 
RUN useradd acid_burn
ADD ./user /home/
RUN chmod +rx /home/acid_burn
RUN chown acid_burn:acid_burn /home/acid_burn
RUN su acid_burn && gcc -o /home/acid_burn/getflag /home/acid_burn/getflag.c
RUN chmod 4755 /home/acid_burn/getflag
RUN chmod 400 /home/acid_burn/flag

