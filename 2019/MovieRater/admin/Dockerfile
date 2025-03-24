FROM ubuntu:18.04

RUN apt-get update
RUN apt-get install chromium-browser -y

ADD ./run.sh /run.sh
RUN chmod 755 /run.sh

CMD ["/bin/bash","/run.sh"]
