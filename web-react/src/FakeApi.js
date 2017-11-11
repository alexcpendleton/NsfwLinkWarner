import shortid from 'shortid'
function init(uriPrePath) {
  const result = {};
  result.create = (unsafeUrl) => {
    return new Promise((resolve, reject)=>{
      const id = shortid.generate();
      resolve({safeUrl:`${uriPrePath}/NSFW/${id}/NSFW`});
    });
  };
  result.fetch = (id) => {
    return new Promise((resolve, reject)=>{
      resolve({
        unsafeUrl:"https://www.google.com?s=butts",
        showAds: true
      });
    });
  };
  return result;
}
export default init;