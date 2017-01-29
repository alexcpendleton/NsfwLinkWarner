'use strict';
var Shrinku = require("shrinku");
var shrinku = new Shrinku();
 
shrinku.useStrategy(new Shrinku.Strategies.SimpleStrategy());
shrinku.addAdapter('memory', new Shrinku.Adapters.MemoryAdapter());
 
var shrinker = new ShrinkuFacade(shrinku);

const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});
function prompt() {
    rl.question('type something:', (typed) => {
        shrinker.buildNsfwWarnerFrom(typed)
            .then(function(result) {
                console.log(`${typed}>`);
                console.log(`${result}`);
                shrinker.extractOriginal(result).then(function(unravelled) {
                    console.log(`unravelled:`, unravelled);
                    prompt();
                })
            });
    });
}
prompt();