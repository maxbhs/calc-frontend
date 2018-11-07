FROM nginx
COPY build /usr/share/nginx/html
RUN apt-get update -y && \ 
    apt-get install -y dnsutils \
    apt-get install -y traceroute \
    apt-get install -y ping
