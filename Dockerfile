FROM node:9-alpine

COPY . /src
RUN cd /src && npm install && npm run build
EXPOSE 80
WORKDIR /src
CMD ["node", "./node_modules/serve/bin/serve.js", "./dist/", "-l", "tcp://0.0.0.0:80"]
