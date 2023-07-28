const express = require('express');
const app = express();
const http = require('http');
const models = require('./models');
const routes = require('./routes');
const dotenv = require('dotenv');
const { Client } = require('pg');

dotenv.config();

models.createPersonalTable();
models.createUserTable();

const host = process.env.API_HOST;
const port = process.env.API_PORT;

const address = `${host}:${port}`;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

routes.loadRoutes(app);

const server = http.createServer(app);

server.listen(port, () => {
  console.log(`Servidor rodando em ${address}`);
});
