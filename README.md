# PJS

A discord bot for PrismarineJS

### Running

#### Production

Using Docker is recommended for production

##### docker run

```sh
docker build -t prismarinejs/discord https://github.com/Zn10plays/PJS
docker run -e TOKEN=123 prismarinejs/discord
```

##### docker-compose.yml

```yml
version: "3.8"

# Tip: Since this does not store any data, you don't have to add volumes

services:
  PJS:
    image: dada513/pjs-bot
    environment:
      - TOKEN=replace_this
      - PREFIX=$pjs
      - OWNER=discord_id
      - INVITE=https://discord.gg/bcsU8wX8KX
      - STATUS=PrismarineJS
```

file is located [here](./docker-compose.yml)

##### Without Docker

You need [node.js](https://nodejs.org) and [yarn](https://yarnpkg.com/getting-started/install) or [npm](https://npmjs.com).

```sh
git clone https://github.com/Zn10plays/PJS
cd PJS

### If using yarn

yarn
yarn run build
yarn start

### If using npm
npm install
npm run build
npm start
```

#### Development

```sh
git clone https://github.com/Zn10plays/PJS
cd PJS
yarn
yarn dev
```

### Configuration

Use a bot.json file

```json
{
  "token": "123"
}
```

OR you can use enviroment variables:

```sh
TOKEN="123"
```

You can also provide the arguments on the command line:

```sh
node dist/index.js --token 123
```
