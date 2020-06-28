var express = require('express')
var fs = require('fs')
var request = require('request')
var cheerio = require('cheerio')
var app = express()
var path = require('path')
const bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({ extended: true }))

app.get('/edhrec', function (req, res) {
  /**
  *  EDHREC
  **/

  var getCards = function (link, cb) {
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

  var url = 'https://edhrec.com/commanders/gonti-lord-of-luxury'
  var card = req.url

  request(url, function (error, response, html) {
    if (!error) {
      //var $ = cheerio.load(html)

      // $('.archetype-tile').filter(function () {
      //   var data = $(this)
      //   var link = 'https://www.mtggoldfish.com/archetype/' + data.attr('id')
      //   getDecklist(link, cb)
      // })
    }
    res.send('Thanks babe!' + card)
  })
})




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

var transformScryfallData = function (url, withCallback, req, res) {
  request(url, function (error, response, html) {
    if (!error) {
      // console.log('html: ' + html)
      // console.log('response: ' + response)

      var obj = JSON.parse(html)

      var card = { title: '', cmc: '', mana_cost: '', power: '', toughness: '', colors: '', abillities: [] }
      card.title = obj.name
      card.cmc = obj.cmc
      card.mana_cost = obj.mana_cost
      card.power = obj.power
      card.toughness = obj.toughness
      if (obj.colors) {
        card.colors = obj.colors.join()
      } else {
        card.colors = 'c'
      }
      if (obj.oracle_text) {
        card.abillities = extractAbillities(obj.oracle_text)
      }
      console.log(card)
      if (withCallback) {
        isDone(card)
      } else {
        var output = '<pre>' + JSON.stringify({ name: req.body.name }) + '</pre>'
        output += '<pre>' + JSON.stringify(card) + '</pre>'
        output += '<pre>' + JSON.stringify(normalize(card)) + '</pre>'
        res.send(output)
      }
    }
  })
}

var numberOfCards = 0
var cards = []

var setNumberOfCards = function (val) {
  numberOfCards = val
}

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

app.get('/transform', function (req, res) {
  /**
   * Read card lists and extract relevant data for each card
   */
  var fs = require('fs')
  fs.readFile('data/raw/dominaria-creatures.txt', 'utf8', function (err, data) {
    if (err) throw err
    var cardlist = data.split('\n')

    console.log(cardlist)

    setNumberOfCards(cardlist.length)

    var baseUrl = 'https://api.scryfall.com/cards/named?exact='

    for (var i = 0; i < cardlist.length; i++) {
      var cardUrl = cardlist[i].toLowerCase()
      if (cardUrl.indexOf(' ') !== -1) {
        cardUrl = cardUrl.replace(' ', '+')
      }

      var url = baseUrl + cardUrl
      transformScryfallData(url, true)
    }

    var output = '<h2>Batch transformation done. Check output file.</h2>'
    res.send(output)
  })
})

var normalize = function (card) {
  var normalizedData = {}

  var blue = {u: 1.0, g: 0.0, w: 0.0, b: 0.0, r: 0.0, o: 0.0}
  var green = {u: 0.0, g: 1.0, w: 0.0, b: 0.0, r: 0.0, o: 0.0}
  var white = {u: 0.0, g: 0.0, w: 1.0, b: 0.0, r: 0.0, o: 0.0}
  var black = {u: 0.0, g: 0.0, w: 0.0, b: 1.0, r: 0.0, o: 0.0}
  var red = {u: 0.0, g: 0.0, w: 0.0, b: 0.0, r: 1.0, o: 0.0}
  var other = {u: 0.0, g: 0.0, w: 0.0, b: 0.0, r: 0.0, o: 1.0}

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
    default: colors = other
  }

  var power = {'power': Math.round(card.power) / 10}

  var toughness = {'toughness': Math.round(card.toughness) / 10}

  var cmc = {'cmc': Math.round(card.cmc) / 10}

  var abillites
  if (card.abillities.length) {
    abillites = {'abillities': Math.round(card.abillities.length) / 10}
  } else {
    abillites = {'abillities': 0}
  }

  normalizedData = Object.assign(cmc, colors, power, toughness, abillites)

  return normalizedData
}

var extractAbillities = function (text) {
  var ruletexts = text.split('\n')
  var abillities = []
  ruletexts.forEach(rule => {
    var abillity = 'special'
    rule = rule.toLowerCase().trim()

    // Remove explanations
    if (rule.indexOf('(') !== -1) {
      rule = rule.replace(/ *\([^)]*\) */g, '').trim()
    }

    // Hard match
    if (rule === 'flying') {
      abillity = 'flying'
    }
    if (rule === 'haste') {
      abillity = 'haste'
    }
    if (rule === 'hexproof') {
      abillity = 'hexproof'
    }
    if (rule === 'delve') {
      abillity = 'delve'
    }
    if (rule === 'first strike') {
      abillity = 'firststrike'
    }
    if (rule === 'reach') {
      abillity = 'reach'
    }
    // Soft match
    if (rule.indexOf('draw') !== -1) {
      abillity = 'draw'
    }
    if (rule.indexOf('affinity') !== -1 || rule.indexOf('this spell costs {1} less to cast') !== -1) {
      abillity = 'affinity'
    }
    if (rule.indexOf('monarch') !== -1) {
      abillity = 'monarch'
    }
    if (rule.indexOf('protection') !== -1) {
      abillity = 'protection'
    }
    if (rule.indexOf('evoke') !== -1) {
      abillity = 'evoke'
    }
    if (rule.indexOf('metalcraft') !== -1) {
      abillity = 'metalcraft'
    }

    abillities.push(abillity)
  })

  return (abillities)
}

app.get('/normalize', function (req, res) {
  /**
   * Read card json and normalize the data to be read by brain.js
   */
  var fs = require('fs')
  fs.readFile('data/raw/2018-04-19-transformation.json', 'utf8', function (err, data) {
    if (err) throw err
    var cardlist = data.split('\n')
    var output = '<h2>Normalization done</h2>'
    cardlist.forEach(row => {
      if (row !== '') {
        console.log(row)
        var card = JSON.parse(row)
        output += '<pre>' + JSON.stringify(normalize(card)) + '</pre>'
      }
    })
    res.send(output)
  })
})

app.get('/card', function (req, res) {
  res.sendFile(path.join(__dirname, '/form.html'))
})

app.post('/card', function (req, res) {
  var baseUrl = 'https://api.scryfall.com/cards/named?exact='
  var name = req.body.name

  var cardUrl = name.toLowerCase()
  if (cardUrl.indexOf(' ') !== -1) {
    cardUrl = cardUrl.replace(' ', '+')
  }
  var url = baseUrl + cardUrl
  transformScryfallData(url, false, req, res)
})
const PORT = process.env.PORT || 8081;
app.listen(PORT)
console.log('Magic happens on', PORT)
exports = module.exports = app

