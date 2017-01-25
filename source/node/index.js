'use strict';

class ShrinkuFacade {
    constructor(shrinku) {
         this.shrinku = shrinku;
    }
    buildNsfwWarnerFrom(url) {
        var self = this;
        return this.shrinku.shrink({url:url})
            .then(function(result) {
                var wrapped = self.wrapInWarning(result.hash);
                return new Promise(function(resolve, reject) {
                    resolve(wrapped);
                });
            });
    }
    wrapInWarning(hash) {
        return `NSFW_${hash}_NSFW`;
    }
}
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
                prompt();
            });
    });
}
prompt();