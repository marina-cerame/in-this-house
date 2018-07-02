'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');

const helper = require('./helpers/prepareHouseText.js');

const PORT = process.env.PORT || 3000;
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'pug');

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});

app.get('/:houseText', (req, res) => {
  try {
    const text = helper.prepareText(req.params.houseText);
    res.render('index', { houseText: req.params.houseText, text: text });
    // res.sendFile('index.html', { root: __dirname + "/public" });
  } catch (error) {
    console.log(error);
    res.statusCode = 501;
    res.end('Whoops! We have a problem.');
  }
  let now = new Date();
  let message =
    now.toString() +
    ' | ' +
    'REQUEST FOR HOUSE: ' +
    req.params.houseText +
    '\n';
  console.log(message);
  fs.appendFile('house_log.txt', message);
});

app.get('/assets/:filePath', (req, res) => {
  try {
    res.sendFile(__dirname + '/public/' + req.params.filePath);
  } catch (error) {
    console.log(error);
    res.statusCode = 501;
    res.end('Whoops! We have a problem.');
  }
});

app.all('*', (req, res) => {
  res.render('template');
  let now = new Date();
  let message = now.toString() + ' | ' + 'landing page request';
  console.log(message);
});
