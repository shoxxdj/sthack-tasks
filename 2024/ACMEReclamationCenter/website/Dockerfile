FROM php:8.2-apache
RUN pecl install redis && docker-php-ext-enable redis
RUN docker-php-ext-install mysqli pdo pdo_mysql
COPY app/ /var/www/html/
