'use strict';

const express = require('express');
const bodyParser = require('body-parser');

const helper = require('./helpers/prepareHouseText.js');

const PORT = process.env.PORT || 3000;
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'pug');

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});

app.get('/andappreciate/:houseText', (req, res) => {
  try {
    console.log('REQUEST FOR HOUSE: ' + req.params.houseText);
    res.render('index', { houseText: req.params.houseText });
    // res.sendFile('index.html', { root: __dirname + "/public" });
  } catch (error) {
    console.log(error);
    res.statusCode = 501;
    res.end('Whoops! We have a problem.');
  }
});

app.get('/andappreciate', (req, res) => {
  res.render('template');
});

app.get('/:houseText', (req, res) => {
  try {
    const text = helper.prepareText(req.params.houseText);
    console.log(text);
    console.log('REQUEST FOR HOUSE: ' + req.params.houseText);
    res.render('index', { houseText: req.params.houseText, text: text });
    // res.sendFile('index.html', { root: __dirname + "/public" });
  } catch (error) {
    console.log(error);
    res.statusCode = 501;
    res.end('Whoops! We have a problem.');
  }
});

app.get('/assets/:filePath', (req, res) => {
  try {
    res.sendFile(__dirname + '/views/' + req.params.filePath);
  } catch (error) {
    console.log(error);
    res.statusCode = 501;
    res.end('Whoops! We have a problem.');
  }
});

app.all('*', (req, res) => {
  res.render('template');
});
