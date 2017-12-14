import shortid from 'shortid'
function init({uriPrePath,delay=3000}) {
  const result = {};
  result.create = (unsafeUri) => {
    return new Promise((resolve, reject)=>{
      setTimeout(()=> {
        const id = shortid.generate();
        resolve({safeUrl:`${uriPrePath}/NSFW/${id}/NSFW`});
      }, delay);
      
    });
  };
  result.fetch = (id) => {
    return new Promise((resolve, reject)=>{
      setTimeout(()=> {
        resolve({
          unsafeUri:"https://www.google.com?s=butts",
          showAds: true
        });
      }, delay);
    });
  };
  return result;
}
export default init;