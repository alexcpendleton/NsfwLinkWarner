class ShrinkuFacade {
  constructor(shrinku) {
    this.shrinku = shrinku;
  }
  buildNsfwWarnerFrom(url) {
    var self = this;
    var wrap = this.wrapInWarning;
    return this.shrinku.shrink({url:url})
      .then(function(result) {
        return new Promise(function(resolve, reject) {
          var wrapped = wrap(result.url);
          resolve(wrapped);
        });
      });
  }
  wrapInWarning(hash) {
    return `NSFW_${hash}_NSFW`;
  }
  unwrapWarning(url) {
    return url.replace("NSFW_", "").replace("_NSFW", "");
  }
  extractOriginal(url) {
    var hash = this.unwrapWarning(url);
    return this.shrinku.unshrink({hash:hash})
      .then(function(result) {
        console.log("unshrink:", JSON.stringify(result));
        return new Promise(function(resolve, reject) {
          resolve(result.url);
        });
      });
  }
}
module.exports = ShrinkuFacade;