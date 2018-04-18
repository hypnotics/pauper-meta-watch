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
    var todaysDate = new Date().toJSON().split('T')[0]
    var filename = 'decks/' + todaysDate + '-' + title + '-' + uuid() + '.json'

    fs.writeFile(filename, JSON.stringify(deck, null, 4), function (err) {
      if (err) {
        console.log('Error: ' + err)
      }
      console.log(filename + ' successfully written!')
    })
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

app.get('/analyse', function (req, res) {
  /**
   * Read and parse deck files
   */
  var fs = require('fs')
  var obj
  fs.readFile('decks/2017-11-27-WUR-65c764e3-df94-447e-8a97-21b3c6b8480f.json', 'utf8', function (err, data) {
    if (err) throw err
    obj = JSON.parse(data)
    console.log(obj)
    var multiplier = obj.meta.split(' Decks')[0]
    var card = { title: '', amount: '', multiplier: '', types: '', color: '', function: '', power: '', toughness: '' }
    card.multiplier = multiplier
    var maindeck = obj.decklist.split('sideboard')[0]
    // var sideboard = obj.decklist.split('sideboard')[1]
    var main = maindeck.split('\n')
    console.log(main)
    var html = '<h2>Analysing decks</h2>'
    main.forEach(element => {
      var name = element.substring(2, element.length)
      var amount = element.substring(0, 1)
      card.amount = amount
      card.title = name
      console.log(card)
      if (card.title !== '') {
        html += '<pre>' + JSON.stringify(card) + '</pre>'
      }
    })

    res.send(html)
  })
})

app.get('/transform', function (req, res) {
  /**
   * Read card lists and extract relevant data for each card
   */
  var fs = require('fs')
  fs.readFile('data/raw/test.txt', 'utf8', function (err, data) {
    if (err) throw err
    var cardlist = data.split('\n')

    console.log(cardlist)

    var numberOfCards = cardlist.length
    var cards = []

    var isDone = function (card) {
      numberOfCards--
      cards.push(card)
      if (numberOfCards === 0) {
        allComplete(cards)
      }
    }

    var allComplete = function (cards) {
      var data = ''
      var todaysDate = new Date().toJSON().split('T')[0]
      var filename = 'data/raw/' + todaysDate + '-transformation' + '.json'

      cards.forEach(card => {
        if (card !== '' && card !== undefined) {
          data += JSON.stringify(card) + '\n'
        }
      })
      fs.writeFile(filename, data, function (err) {
        if (err) throw err
        console.log('finished writing cards')
      })
    }

    for (var i = 0; i < cardlist.length; i++) {
      var baseUrl = 'https://api.scryfall.com/cards/named?exact='
      var cardUrl = cardlist[i].toLowerCase()
      if (cardUrl.indexOf(' ') !== -1) {
        cardUrl = cardUrl.replace(' ', '+')
      }

      var url = baseUrl + cardUrl

      console.log(url)

      request(url, function (error, response, html) {
        if (!error) {
          // console.log('html: ' + html)
          // console.log('response: ' + response)

          var obj = JSON.parse(html)

          var card = { title: '', cmc: '', mana_cost: '', power: '', toughness: '', colors: '', oracle_text: '' }
          card.title = obj.name
          card.cmc = obj.cmc
          card.mana_cost = obj.mana_cost
          card.power = obj.power
          card.toughness = obj.toughness
          card.colors = obj.colors.join()
          card.oracle_text = obj.oracle_text
          console.log(card)

          isDone(card)

          // fs.readFile(filename, 'utf8', function (err, data) {
          //   if (err) throw err
          //   data = JSON.stringify(card) + '\n'
          //   fs.writeFile('data/raw/' + card.title, data, function (err) {
          //     if (err) throw err
          //     console.log('complete')
          //   })
          // })
        }
      })
    }

    var output = '<h2>Transformation Done</h2>'
    res.send(output)
  })
})

var normalize = function (card) {
  var normalizedData = []

  var blue = [1.0, 0.0, 0.0, 0.0, 0.0]
  var green = [0.0, 1.0, 0.0, 0.0, 0.0]
  var white = [0.0, 0.0, 1.0, 0.0, 0.0]
  var black = [0.0, 0.0, 0.0, 1.0, 0.0]
  var red = [0.0, 0.0, 0.0, 0.0, 1.0]

  var colors
  switch (card.colors.toLowerCase()) {
    case 'g': colors = green
      break
    case 'r': colors = red
      break
    case 'b': colors = black
      break
    case 'w': colors = white
      break
    case 'u': colors = blue
      break
  }

  var power = []
  power.push(card.power * 0.1)

  var toughness = []
  toughness.push(card.toughness * 0.1)

  var cmc = []
  cmc.push(card.cmc * 0.1)

  normalizedData = colors.concat(power).concat(toughness).concat(cmc)

  return normalizedData
}

app.get('/normalize', function (req, res) {
  /**
   * Read card json and normalize the data to be read by brain.js
   */
  var fs = require('fs')
  fs.readFile('data/raw/2018-04-18-transformation.json', 'utf8', function (err, data) {
    if (err) throw err
    var cardlist = data.split('\n')
    var output = '<h2>Normalization done</h2>'
    cardlist.forEach(row => {
      if (row !== '') {
        console.log(row)
        var card = JSON.parse(row)
        output += '<pre>' + normalize(card) + '</pre>'
      }
    })
    res.send(output)
  })
})

app.listen('8081')
console.log('Magic happens on port 8081')
exports = module.exports = app

