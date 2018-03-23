"use strict";

const express = require('express');
const bodyParser = require('body-parser');

const PORT = process.env.PORT || 3000;
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'pug')


app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});

app.get('/andappreciate/:houseText', (req, res) => {
  try {
    res.render('index', {"houseText": req.params.houseText});
    // res.sendFile('index.html', { root: __dirname + "/public" });
  } catch(error) {
    console.log(error);
    res.statusCode = 501;
    res.end('Whoops! We have a problem.');
  }

});

app.get('/andappreciate', (req, res) => {
  res.render('index', {"houseText": "[Your Text Here]"});
});

app.get('/:houseText', (req, res) => {
  try {
    res.render('index', {"houseText": req.params.houseText});
    // res.sendFile('index.html', { root: __dirname + "/public" });
  } catch(error) {
    console.log(error);
    res.statusCode = 501;
    res.end('Whoops! We have a problem.');
  }

});

app.all('*', (req, res) => {
  res.render('index', {"houseText": "[Your Text Here]"});
});
