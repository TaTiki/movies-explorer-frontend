const contentType = {
  'Content-Type': 'application/json',
};

export default function request({ method, url, extraHeaders = {}, body = undefined, timeout = 20000}) {
  const headers = body ? {
    ...extraHeaders,
    ...contentType,
  } : extraHeaders;

  const options = {
    method,
    headers,
  };

  if (body) {
    options.body = body;
  }

  const promises = [fetch(url, options)];

  let expires;
  const existTimeout = timeout > 0; 
  if (existTimeout){
    const timeoutPromise = new Promise((_, reject) => {
      expires = setTimeout(reject, timeout, 'timeout');
    })
    promises.push(timeoutPromise);
  }

  return Promise.race(promises).then((resp) => {
    if (existTimeout){
      clearTimeout(expires);
    }
    if (resp.ok){
      return resp;
    }
    return resp.status === 500 ?
    Promise.reject('Что-то пошло не так...') :
    resp.json().then(({ message }) => Promise.reject({code: resp.status, message }));
  });
}