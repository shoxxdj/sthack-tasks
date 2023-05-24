FROM centos:7
RUN yum install httpd -y
RUN ulimit -n 1024000 &&  yum update -y && \
    yum install -y epel-release && \
    rpm -Uvh http://rpms.remirepo.net/enterprise/remi-release-7.rpm && \
    yum install -y php php-cli php-fpm php-mysqlnd php-zip php-devel php-gd php-mcrypt php-mbstring php-curl php-xmlrpc php-pecl-redis && \
    yum install -y gcc make && \
    yum clean all && \
    rm -rf /var/cache/yum/*
RUN echo "ServerName 127.0.0.1" >> /etc/httpd/conf/httpd.conf
RUN sed -i 's/AllowOverride None/AllowOverride All/' /etc/httpd/conf/httpd.conf && echo "CustomLog /var/log/httpd/access.log combined" >> /etc/httpd/conf/httpd.conf

RUN ln -sf /dev/stdout /var/log/httpd/access.log && \
    ln -sf /dev/stderr /var/log/httpd/error.log

COPY code/ /var/www/html
COPY apps/ /apps

RUN useradd miley
COPY user /home/
RUN su miley && cd /home/miley && gcc -o getflag getflag.c
RUN chown miley:miley /home/miley/flag
RUN chown miley:miley /home/miley/getflag
RUN su miley && chmod 4755 /home/miley/getflag
RUN chmod 400 /home/miley/flag

RUN ulimit -n 1024000 && yum install nmap-ncat -y

# Start Apache and enable it to start at boot
RUN systemctl enable httpd
CMD ["/usr/sbin/httpd", "-D", "FOREGROUND"]
