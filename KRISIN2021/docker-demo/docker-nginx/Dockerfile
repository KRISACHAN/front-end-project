FROM nginx:1.13.12-alpine as production-stage
RUN nginx -v

COPY nginx.conf /etc/nginx/nginx.conf
COPY default.conf /etc/nginx/conf.d/default.conf
COPY dist /usr/share/nginx/html

CMD ["nginx", "-g", "daemon off;"]