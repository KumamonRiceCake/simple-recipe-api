const express = require('express');
const recipesRouter = require('./routers/recipes');

const app = express();

app.use(express.json());
app.use(recipesRouter);

module.exports = app;