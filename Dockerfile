FROM nginx
COPY build /usr/share/nginx/html
COPY resolv.conf /etc/resolv.conf
RUN apt-get update -y && \ 
    apt-get install -y dnsutils
