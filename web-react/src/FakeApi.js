import shortid from 'shortid'
function init(uriPrePath) {
  const result = {};
  result.create = (unsafeUrl) => {
    return new Promise((resolve, reject)=>{
      const hash = shortid.generate();
      resolve({safeUrl:`${uriPrePath}/NSFW/${hash}/NSFW`});
    });
  };
  return result;
}
export default init;