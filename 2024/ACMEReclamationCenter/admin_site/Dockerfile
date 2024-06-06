FROM php:8.2-apache
RUN apt update && apt install ncat gcc python3 -y
RUN pecl install redis && docker-php-ext-enable redis
RUN a2enmod dump_io
RUN docker-php-ext-install mysqli pdo pdo_mysql
COPY app/ /var/www/html/

RUN useradd cortex --password rtghjklinkfzYpohSJqdqsdqsUpWiw
ADD flag/ /home/cortex
RUN chown cortex:cortex /home/cortex/flag.txt && chmod 400 /home/cortex/flag.txt
RUN chown cortex:cortex /home/cortex/getflag.c
RUN cd /home/cortex && gcc getflag.c -o getflag 
RUN chown cortex:cortex /home/cortex/getflag
RUN su cortex -c "chmod 4555 /home/cortex/getflag"