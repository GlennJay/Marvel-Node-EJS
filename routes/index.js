var express = require('express');
var router = express.Router();
const axios = require('axios');
var api = require('marvel-api');
var marvelKey = require('./marvel')
var crypto = require('crypto');

var timeStamp = new Date().getTime();
var marvelHash = crypto.createHash('md5').update(timeStamp + marvelKey.privKey + marvelKey.pubKey).digest('hex');


var charactersURL = 'https://gateway.marvel.com:443/v1/public/characters?name=wolverine&apikey=63e5e013e5e1b67f47366be462ccc44c'
var marvel = api.createClient({
    publicKey: marvelKey.pubKey
  , privateKey: marvelKey.privKey
  });

/* GET home page. */
router.get('/', function(req, res, next) {
  
  var name;

  axios.get('https://gateway.marvel.com:443/v1/public/characters?nameStartsWith=a',{
    params: {
      ts:  timeStamp,
      apikey: marvelKey.pubKey,
      hash:  marvelHash
    }
  })
  .then(response => {
    console.log(response);//.data.data.results[0].name);
    let results = response.data.data.results;
    res.render('index', { results: results });
  })
  .catch(error => console.log(error));
});


//search for requested data
router.post('/', function(req,res){
  var search = req.body.search
  axios.get('https://gateway.marvel.com:443/v1/public/characters?nameStartsWith=' + search,{
    params: {
      ts:  timeStamp,
      apikey: marvelKey.pubKey,
      hash:  marvelHash
    }
  })
  .then(response => {
    console.log(response);
    let results = response.data.data.results;
    res.render('index', { results: results });
  })
  .catch(error => console.log(error));

});

router.get("/:id", function(req,res){
  axios.get('https://gateway.marvel.com:443/v1/public/characters/' + req.params.id,{
    params: {
      ts:  timeStamp,
      apikey: marvelKey.pubKey,
      hash:  marvelHash
    }
  })
  .then(response =>{
    let character = response.data.data.results;
    res.render('index', {results: character});
  })
  .catch(error => console.log(error));
});

module.exports = router;
