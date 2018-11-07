FROM nginx
COPY build /usr/share/nginx/html
RUN apt-get update -y && \ 
    apt-get install -y dnsutils traceroute
