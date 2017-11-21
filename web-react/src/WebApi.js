function init({uriPrePath, apiBaseUri}) {
  const result = {};
  function fetchRelative(relativePath, options) {
    const uri = apiBaseUri + relativePath;
    return fetch(uri, options)
  }
  result.create = (unsafeUri) => {
    return new Promise((resolve, reject)=>{
      const handleSuccess = (response) => {
        console.log("create success call:", response);
        if(response.ok) {
          const json = response.json().data;
          const id = json.id;
          const created = {
            safeUri: uriPrePath + `/NSFW/${id}/NSFW`
          }
          resolve(created);
        } else {
          var error = new Error('Not ok');
          error.response = response;
          console.log("create success, but not ok:", error); 
          reject(error);
        }
      };
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
        console.log("create success call:", response);
        if(response.ok) {
          resolve(response.body.json);
        } else {
          var error = new Error('Not ok');
          error.response = response;
          console.log("create success, but not ok:", error); 
          reject(error);
        }
      };
      fetchRelative(`veils/${id}`, {
        method:'GET',
        mode: 'cors',
        cache: 'default',
        headers: new Headers({'content-type': 'application/json'}),

      }).then(handleSuccess, reject);
    });
  };
  return result;
}
export default init;