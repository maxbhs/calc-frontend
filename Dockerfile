FROM nginx
COPY build /usr/share/nginx/html
ENV PATH "$PATH:/usr/bin"
