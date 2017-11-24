var express = require('express')
var fs = require('fs')
var request = require('request')
var cheerio = require('cheerio')
var app = express()

app.get('/scrape', function (req, res) {
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

  var getDecklist = function (link, cb) {
    request(link, function (error, response, html) {
      if (!error) {
        var $ = cheerio.load(html)
        var decklist, title, meta
        $('#deck_input_deck').filter(function () {
          var deck = $(this)
          decklist = deck.attr('value')
        })
        $('.deck-view-title').filter(function () {
          var data = $(this)
          title = data.first().text().split('Suggest')[0].trim()
        })
        $('.deck-view-title-bar').next().filter(function () {
          var data = $(this)
          meta = data.text().trim()
        })
        cb(link, meta, title, decklist)
      }
    })
  }

  function uuid () {
    var uuid = ''
    var i
    var random
    for (i = 0; i < 32; i++) {
      random = Math.random() * 16 | 0

      if (i === 8 || i === 12 || i === 16 || i === 20) {
        uuid += '-'
      }
      uuid += (i === 12 ? 4 : (i === 16 ? (random & 3 | 8) : random)).toString(16)
    }
    return uuid
  }

  var cb = function (link, meta, title, decklist) {
    var deck = { title: '', link: '', decklist: '', meta: '' }
    deck.link = link
    deck.title = title
    deck.decklist = decklist
    deck.meta = meta
    // var todaysDate = new Date().toJSON().split('T')[0] + '/'
    var filename = 'decks/' + title + '-' + uuid() + '.json'

    fs.writeFile(filename, JSON.stringify(deck, null, 4), function (err) {
      // console.log('File successfully written!')
    })
    console.log('Files successfully written!')
  }

  var url = 'https://www.mtggoldfish.com/metagame/pauper/full#paper'

  request(url, function (error, response, html) {
    if (!error) {
      var $ = cheerio.load(html)

      $('.archetype-tile').filter(function () {
        var data = $(this)
        var link = 'https://www.mtggoldfish.com/archetype/' + data.attr('id')
        getDecklist(link, cb)
      })
    }

    res.send('Done!')
  })

  // res.send('Scraping Pauper Meta done...')
})

app.listen('8081')
console.log('Magic happens on port 8081')
exports = module.exports = app

