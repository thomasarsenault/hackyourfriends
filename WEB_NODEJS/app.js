const express = require('express')
const fs = require('fs');
const bodyParser = require('body-parser')

const app = express();
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Cache-Control", "no-cache, no-store")
  next();
});

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.get('/', (req, res) => {
  res.send('Hello World!')
});

app.get('/getHack/:user', (req, res) => {
  let data = require('./data/hacks.json');
  let user = req.params.user;

  console.log("return hack")
  res.status(200).send(data[user].code);
});

app.post('/updateHack/:user', (req, res) => {
  let data = require('./data/hacks.json');
  let user = req.params.user;
  
  data[user].code = req.body.code;
  let dataWrite = JSON.stringify(data);
  fs.writeFileSync('./data/hacks.json', dataWrite);
  res.status(200).send(req.body)
  
});

app.listen(8000, () => {
  console.log('Example app listening on port 8000!')
});