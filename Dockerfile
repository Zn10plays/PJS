FROM node:12-alpine
WORKDIR /app
RUN apk add git
RUN git clone https://github.com/Zn10plays/PJS .
RUN yarn
RUN yarn run build
ENTRYPOINT [ "node", "dist/index.js" ]
