var express = require('express');
var fs      = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var app     = express();

app.get('/scrape', function(req, res){

  /**
  *  Main page
  * 1. https://www.mtggoldfish.com/metagame/pauper/full#paper
  * 2. Scrape links to all decks and add meta % + decks
  * 3. Go into each deck link: https://www.mtggoldfish.com/archetype/pauper-stompy-22958#paper

<input type="hidden" name="deck_input[deck]" id="deck_input_deck" value="4 Burning-Tree Emissary
4 Nest Invader
4 Nettle Sentinel
3 Quirion Ranger
3 Silhana Ledgewalker
4 Skarrgan Pit-Skulk
2 Vault Skirge
3 Young Wolf
4 Hunger of the Howlpack
4 Vines of Vastwood
4 Elephant Guide
4 Rancor
17 Forest
sideboard
4 Epic Confrontation
4 Gleeful Sabotage
2 Scattershot Archer
2 Serene Heart
3 Viridian Longbow
" />

  * 4. For each line do request to scryfall
  *    https://api.scryfall.com/cards/named?exact=hunger+of+the+howlpack
  *  a) color- colors []
  *  b) types - type_line (space separated)
  *  c) power / toughness - power / toughness
  *  also check towards lists
  *  - isRemoval/Bounce
  *  - isLandDestruction
  *  - isCounter
  *  - isDirectDamage
  *  - isCombo
  **/

  url = 'https://www.mtggoldfish.com/metagame/pauper/full#paper';

  request(url, function(error, response, html){
    if(!error){
      var $ = cheerio.load(html);

      var title, link, decklist, meta;
      var json = {};

      var links = [];
      var metas = []; 
      var counter = 0;

      $('.archetype-tile').filter(function(){
        var data = $(this);
        link = 'https://www.mtggoldfish.com/archetype/' + data.attr('id');
	links.push(link);
      })

      $('.percentage').filter(function(){
        var data = $(this);
        meta = data.text().trim();
        metas.push(meta);
      })

      /**	
      $('.deck-view-title').filter(function(){
        var data = $(this);
        title = data.text().trim();

        json.title = rating;
      }) 
      **/

    }
    var decks = []
    links.forEach(function (item, index) {
       var deck = { title : "", link : "", decklist : "", meta: ""};
       deck.link = item;
       deck.meta = metas[index];
       decks.push(deck);
    }); 

    json['decks'] = decks; 
    fs.writeFile('output.json', JSON.stringify(json, null, 4), function(err){
      console.log('File successfully written! - Check your project directory for the output.json file');
    }) 

    //res.send('Done!')
  })
  
  res.send('Done!')
});

app.listen('8081')
console.log('Magic happens on port 8081');
exports = module.exports = app;

