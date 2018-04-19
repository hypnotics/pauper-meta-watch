const brain = require('brain.js')

var net = new brain.NeuralNetwork()

net.train([
           {input: {'cmc': 0.2, 'u': 1, 'g': 0, 'w': 0, 'b': 0, 'r': 0, 'o': 0, 'power': 0.1, 'toughness': 0.3, 'abillities': 0.1}, output: { good: 1 }},
           {input: {'cmc': 0.5, 'u': 1, 'g': 0, 'w': 0, 'b': 0, 'r': 0, 'o': 0, 'power': 0.2, 'toughness': 0.2, 'abillities': 0.3}, output: { good: 1 }},
           {input: {'cmc': 0.4, 'u': 1, 'g': 0, 'w': 0, 'b': 0, 'r': 0, 'o': 0, 'power': 0.2, 'toughness': 0.2, 'abillities': 0.2}, output: { good: 1 }},
           {input: {'cmc': 0.3, 'u': 1, 'g': 0, 'w': 0, 'b': 0, 'r': 0, 'o': 0, 'power': 0.2, 'toughness': 0.2, 'abillities': 0.3}, output: { good: 1 }},
           {input: {'cmc': 0.4, 'u': 0, 'g': 0, 'w': 1, 'b': 0, 'r': 0, 'o': 0, 'power': 0.2, 'toughness': 0.4, 'abillities': 0.1}, output: { good: 1 }},
           {input: {'cmc': 0.2, 'u': 1, 'g': 0, 'w': 0, 'b': 0, 'r': 0, 'o': 0, 'power': 0.1, 'toughness': 0.1, 'abillities': 0.3}, output: { good: 1 }},
           {input: {'cmc': 0.3, 'u': 1, 'g': 0, 'w': 0, 'b': 0, 'r': 0, 'o': 0, 'power': 0.1, 'toughness': 0.3, 'abillities': 0.1}, output: { good: 1 }},
           {input: {'cmc': 0.2, 'u': 0, 'g': 0, 'w': 1, 'b': 0, 'r': 0, 'o': 0, 'power': 0.2, 'toughness': 0.3, 'abillities': 0.2}, output: { good: 1 }},
           {input: {'cmc': 0.1, 'u': 1, 'g': 0, 'w': 0, 'b': 0, 'r': 0, 'o': 0, 'power': 0.1, 'toughness': 0.1, 'abillities': 0.2}, output: { good: 1 }},
           {input: {'cmc': 0.2, 'u': 0, 'g': 0, 'w': 1, 'b': 0, 'r': 0, 'o': 0, 'power': 0.1, 'toughness': 0.1, 'abillities': 0.1}, output: { good: 1 }},
           {input: {'cmc': 0.2, 'u': 0, 'g': 0, 'w': 0, 'b': 0, 'r': 0, 'o': 1, 'power': 0.2, 'toughness': 0.2, 'abillities': 0.1}, output: { good: 1 }},
           {input: {'cmc': 0.7, 'u': 0, 'g': 0, 'w': 0, 'b': 1, 'r': 0, 'o': 0, 'power': 0.5, 'toughness': 0.5, 'abillities': 0.1}, output: { good: 1 }},
           {input: {'cmc': 0.1, 'u': 0, 'g': 0, 'w': 1, 'b': 0, 'r': 0, 'o': 0, 'power': 0.1, 'toughness': 0.1, 'abillities': 0.1}, output: { good: 1 }},
           {input: {'cmc': 0.1, 'u': 0, 'g': 0, 'w': 1, 'b': 0, 'r': 0, 'o': 0, 'power': 0.1, 'toughness': 0.2, 'abillities': 0.1}, output: { good: 1 }},
           {input: {'cmc': 0.2, 'u': 0, 'g': 1, 'w': 0, 'b': 0, 'r': 0, 'o': 0, 'power': 0.1, 'toughness': 0.1, 'abillities': 0.2}, output: { good: 1 }},
           {input: {'cmc': 0.1, 'u': 0, 'g': 0, 'w': 0, 'b': 0, 'r': 0, 'o': 1, 'power': 0.1, 'toughness': 0.1, 'abillities': 0.1}, output: { good: 1 }},
           {input: {'cmc': 0.1, 'u': 0, 'g': 0, 'w': 1, 'b': 0, 'r': 0, 'o': 0, 'power': 0.2, 'toughness': 0.2, 'abillities': 0.2}, output: { good: 1 }},
           {input: {'cmc': 0.1, 'u': 0, 'g': 1, 'w': 0, 'b': 0, 'r': 0, 'o': 0, 'power': 0.2, 'toughness': 0.2, 'abillities': 0.2}, output: { good: 1 }},
           {input: {'cmc': 0.3, 'u': 0, 'g': 0, 'w': 0, 'b': 1, 'r': 0, 'o': 0, 'power': 0.2, 'toughness': 0.2, 'abillities': 0.1}, output: { good: 1 }},
           {input: {'cmc': 0.1, 'u': 0, 'g': 1, 'w': 0, 'b': 0, 'r': 0, 'o': 0, 'power': 0.1, 'toughness': 0.1, 'abillities': 0.1}, output: { good: 1 }},
           {input: {'cmc': 0.1, 'u': 0, 'g': 1, 'w': 0, 'b': 0, 'r': 0, 'o': 0, 'power': 0.1, 'toughness': 0.1, 'abillities': 0.1}, output: { good: 1 }},
           {input: {'cmc': 0.6, 'u': 0, 'g': 0, 'w': 0, 'b': 0, 'r': 0, 'o': 1, 'power': 0.2, 'toughness': 0.4, 'abillities': 0.2}, output: { good: 1 }},
           {input: {'cmc': 0.2, 'u': 0, 'g': 0, 'w': 1, 'b': 0, 'r': 0, 'o': 0, 'power': 0.2, 'toughness': 0.1, 'abillities': 0.1}, output: { good: 1 }},
           {input: {'cmc': 0.1, 'u': 0, 'g': 0, 'w': 0, 'b': 0, 'r': 1, 'o': 0, 'power': 0.1, 'toughness': 0.1, 'abillities': 0.1}, output: { good: 1 }},
           {input: {'cmc': 0.7, 'u': 0, 'g': 1, 'w': 0, 'b': 0, 'r': 0, 'o': 0, 'power': 0.4, 'toughness': 0.7, 'abillities': 0.1}, output: { bad: 1 }},
           {input: {'cmc': 0.2, 'u': 0, 'g': 0, 'w': 1, 'b': 0, 'r': 0, 'o': 0, 'power': 0.1, 'toughness': 0.1, 'abillities': 0.1}, output: { bad: 1 }},
           {input: {'cmc': 0.3, 'u': 1, 'g': 0, 'w': 0, 'b': 0, 'r': 0, 'o': 0, 'power': 0.1, 'toughness': 0.2, 'abillities': 0.1}, output: { bad: 1 }},
           {input: {'cmc': 0.2, 'u': 0, 'g': 0, 'w': 0, 'b': 0, 'r': 1, 'o': 0, 'power': 0.3, 'toughness': 0.3, 'abillities': 0.1}, output: { bad: 1 }},
           {input: {'cmc': 0.1, 'u': 0, 'g': 0, 'w': 0, 'b': 0, 'r': 0, 'o': 1, 'power': 0.1, 'toughness': 0.1, 'abillities': 0.3}, output: { bad: 1 }},
           {input: {'cmc': 0.7, 'u': 0, 'g': 0, 'w': 0, 'b': 0, 'r': 0, 'o': 1, 'power': 0.4, 'toughness': 0.4, 'abillities': 0.2}, output: { bad: 1 }},
           {input: {'cmc': 0.7, 'u': 0, 'g': 0, 'w': 0, 'b': 0, 'r': 0, 'o': 1, 'power': 0.4, 'toughness': 0.4, 'abillities': 0.2}, output: { bad: 1 }},
           {input: {'cmc': 0.6, 'u': 0, 'g': 0, 'w': 0, 'b': 1, 'r': 0, 'o': 0, 'power': 0.5, 'toughness': 0.5, 'abillities': 0.2}, output: { bad: 1 }},
           {input: {'cmc': 0.2, 'u': 0, 'g': 0, 'w': 0, 'b': 0, 'r': 1, 'o': 0, 'power': 0.1, 'toughness': 0.2, 'abillities': 0.1}, output: { bad: 1 }},
           {input: {'cmc': 0.3, 'u': 0, 'g': 0, 'w': 1, 'b': 0, 'r': 0, 'o': 0, 'power': 0.1, 'toughness': 0.3, 'abillities': 0.1}, output: { bad: 1 }},
           {input: {'cmc': 0.4, 'u': 0, 'g': 0, 'w': 1, 'b': 0, 'r': 0, 'o': 0, 'power': 0, 'toughness': 0.2, 'abillities': 0.1}, output: { bad: 1 }},
           {input: {'cmc': 0.5, 'u': 0, 'g': 0, 'w': 1, 'b': 0, 'r': 0, 'o': 0, 'power': 0.1, 'toughness': 0.5, 'abillities': 0.1}, output: { bad: 1 }},
           {input: {'cmc': 0.4, 'u': 1, 'g': 0, 'w': 0, 'b': 0, 'r': 0, 'o': 0, 'power': 0.2, 'toughness': 0.1, 'abillities': 0.2}, output: { bad: 1 }},
           {input: {'cmc': 0.5, 'u': 1, 'g': 0, 'w': 0, 'b': 0, 'r': 0, 'o': 0, 'power': 0.2, 'toughness': 0.5, 'abillities': 0}, output: { bad: 1 }},
           {input: {'cmc': 0.9, 'u': 1, 'g': 0, 'w': 0, 'b': 0, 'r': 0, 'o': 0, 'power': 1, 'toughness': 1, 'abillities': 0.4}, output: { bad: 1 }},
           {input: {'cmc': 0.2, 'u': 0, 'g': 0, 'w': 0, 'b': 1, 'r': 0, 'o': 0, 'power': 0.2, 'toughness': 0.2, 'abillities': 0.1}, output: { bad: 1 }},
           {input: {'cmc': 0, 'u': 0, 'g': 0, 'w': 0, 'b': 0, 'r': 0, 'o': 1, 'power': 0, 'toughness': 0, 'abillities': 0.3}, output: { bad: 1 }},
           {input: {'cmc': 0.7, 'u': 1, 'g': 0, 'w': 0, 'b': 0, 'r': 0, 'o': 0, 'power': 0.6, 'toughness': 0.6, 'abillities': 0.2}, output: { bad: 1 }},
           {input: {'cmc': 0.2, 'u': 0, 'g': 0, 'w': 0, 'b': 1, 'r': 0, 'o': 0, 'power': 0, 'toughness': 0.1, 'abillities': 0.3}, output: { bad: 1 }},
           {input: {'cmc': 0.6, 'u': 0, 'g': 0, 'w': 1, 'b': 0, 'r': 0, 'o': 0, 'power': 0.2, 'toughness': 0.5, 'abillities': 0.2}, output: { bad: 1 }},
           {input: {'cmc': 0.1, 'u': 0, 'g': 0, 'w': 1, 'b': 0, 'r': 0, 'o': 0, 'power': 0, 'toughness': 0.1, 'abillities': 0.1}, output: { bad: 1 }},
           {input: {'cmc': 0.4, 'u': 0, 'g': 0, 'w': 1, 'b': 0, 'r': 0, 'o': 0, 'power': 0.1, 'toughness': 0.3, 'abillities': 0.1}, output: { bad: 1 }},
           {input: {'cmc': 0.5, 'u': 0, 'g': 0, 'w': 0, 'b': 0, 'r': 0, 'o': 1, 'power': 0.3, 'toughness': 0.3, 'abillities': 0.1}, output: { bad: 1 }},
           {input: {'cmc': 0.5, 'u': 0, 'g': 0, 'w': 0, 'b': 0, 'r': 1, 'o': 0, 'power': 0.3, 'toughness': 0.2, 'abillities': 0.1}, output: { bad: 1 }},
           {input: {'cmc': 0.5, 'u': 0, 'g': 0, 'w': 0, 'b': 0, 'r': 1, 'o': 0, 'power': 0.3, 'toughness': 0.3, 'abillities': 0.1}, output: { bad: 1 }},
           {input: {'cmc': 0.5, 'u': 1, 'g': 0, 'w': 0, 'b': 0, 'r': 0, 'o': 0, 'power': 0.3, 'toughness': 0.3, 'abillities': 0.1}, output: { bad: 1 }},
           {input: {'cmc': 0.7, 'u': 0, 'g': 0, 'w': 0, 'b': 0, 'r': 0, 'o': 1, 'power': 0.5, 'toughness': 0.5, 'abillities': 0}, output: { bad: 1 }},
           {input: {'cmc': 0.6, 'u': 0, 'g': 0, 'w': 0, 'b': 0, 'r': 0, 'o': 1, 'power': 0.4, 'toughness': 0.2, 'abillities': 0.1}, output: { bad: 1 }},
           {input: {'cmc': 0.2, 'u': 1, 'g': 0, 'w': 0, 'b': 0, 'r': 0, 'o': 0, 'power': 0.1, 'toughness': 0.1, 'abillities': 0.1}, output: { bad: 1 }},
           {input: {'cmc': 0.5, 'u': 1, 'g': 0, 'w': 0, 'b': 0, 'r': 0, 'o': 0, 'power': 0.3, 'toughness': 0.3, 'abillities': 0.1}, output: { bad: 1 }},
           {input: {'cmc': 0.3, 'u': 0, 'g': 0, 'w': 0, 'b': 0, 'r': 1, 'o': 0, 'power': 0.1, 'toughness': 0.1, 'abillities': 0.1}, output: { bad: 1 }},
           {input: {'cmc': 0.8, 'u': 0, 'g': 0, 'w': 1, 'b': 0, 'r': 0, 'o': 0, 'power': 0.8, 'toughness': 0.4, 'abillities': 0.1}, output: { bad: 1 }}
])

var output = net.run(
    {'cmc': 0.1, 'u': 0, 'g': 0, 'w': 0, 'b': 0, 'r': 0, 'o': 1, 'power': 0.1, 'toughness': 0.1, 'abillities': 0.1} // Slippery Bogle
    // {'cmc': 0.1, 'u': 1, 'g': 0, 'w': 0, 'b': 0, 'r': 0, 'o': 0, 'power': 0.1, 'toughness': 0.1, 'abillities': 0.2} // Artificer's apprentice
    // {'cmc': 0.5, 'u': 0, 'g': 0, 'w': 0, 'b': 0, 'r': 1, 'o': 0, 'power': 0.5, 'toughness': 0.4, 'abillities': 0} // Fire Elemental
    // {'cmc': 0.3, 'u': 1, 'g': 0, 'w': 0, 'b': 0, 'r': 0, 'o': 0, 'power': 0.2, 'toughness': 0.2, 'abillities': 0.3} // Academy Drake
    // {'cmc': 0.4, 'u': 0, 'g': 0, 'w': 0, 'b': 0, 'r': 1, 'o': 0, 'power': 0.3, 'toughness': 0.3, 'abillities': 0} // Hill Giant
)

// {"cmc":0.5,"u":0,"g":0,"w":0,"b":1,"r":0,"o":0,"power":0.3,"toughness":0.2,"abillities":0.2}
// {"cmc":0.2,"u":0,"g":0,"w":0,"b":1,"r":0,"o":0,"power":0.2,"toughness":0.1,"abillities":0.2}
// {"cmc":0.4,"u":0,"g":0,"w":1,"b":0,"r":0,"o":0,"power":0.3,"toughness":0.2,"abillities":0.1}
// {"cmc":0.3,"u":0,"g":0,"w":0,"b":0,"r":1,"o":0,"power":0.2,"toughness":0.2,"abillities":0.2}
// {"cmc":0.2,"u":0,"g":0,"w":1,"b":0,"r":0,"o":0,"power":0.2,"toughness":0.2,"abillities":0.1}
// {"cmc":0.1,"u":0,"g":1,"w":0,"b":0,"r":0,"o":0,"power":0.1,"toughness":0.1,"abillities":0.1}
// {"cmc":0.5,"u":0,"g":1,"w":0,"b":0,"r":0,"o":0,"power":0.3,"toughness":0.5,"abillities":0.1}

console.log(output)
