function init({uriPrePath, apiBaseUri}) {
  const result = {};
  function fetchRelative(relativePath, options) {
    const uri = apiBaseUri + relativePath;
    return fetch(uri, options)
  }
  result.create = (unsafeUri) => {
    return new Promise((resolve, reject)=>{
      const handleSuccess = (response) => {
        if(response.ok) {
          response.json().then((json)=> {
            const id = json.id;
            const created = {
              safeUri: uriPrePath + `/NSFW/${id}/NSFW`
            };
            resolve(created);
          }, reject);
        } else {
          var error = new Error('Not ok');
          error.response = response;
          reject(error);
        }
      };
      
      if(!unsafeUri) {
        const emptyUriError = new Error();
        emptyUriError.name = "EmptySafeUri";
        emptyUriError.friendlyMessage = "Please enter a URL! :)";
        return reject(emptyUriError);
      }

      fetchRelative('veils', {
        method:'POST',
        mode: 'cors',
        cache: 'default',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({unsafeUri})
      }).then(handleSuccess, reject);
    });
  };
  result.fetch = (id) => {
    return new Promise((resolve, reject)=>{
      const handleSuccess = (response) => {
        if(response.ok) {
          response.json().then(resolve, reject);
        } else {
          var error = new Error('Not ok');
          error.response = response;
          reject(error);
        }
      };
      fetchRelative(`veils/${id}`, {
        method:'GET',
        mode: 'cors',
        cache: 'default',
        headers: new Headers({'content-type': 'application/json'})
      }).then(handleSuccess, reject);
    });
  };
  return result;
}
export default init;