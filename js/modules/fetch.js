

const headers = {
  'Content-Type': 'application/json'
}

export function getMarkerInfo(method, url, body = null) {

  return fetch(url, {
    method: method,
    headers: headers
  }).then(response => {
    if (response.ok) {
    return response.json()
  }

})
}

export function sendData(form) {
  console.log(form);

 return fetch('https://24.javascript.pages.academy/keksobooking', {
    method: 'POST',
    body: form,
    headers: {
      "Content-Type": "multipart/form-data"
    },
   })


}

