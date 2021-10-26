const baseurl = process.env.REACT_APP_API_URL

 
export const fetchSinToken = (endpoint, data, method='GET') => {
  const url = `${baseurl}/${endpoint}`

  if(method === 'GET'){
    return fetch(url)
  } else{
    return fetch(url, {
      method,
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(data)
    })
  }
}

