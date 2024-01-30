import axios from 'axios';

axios.defaults.headers.common['x-api-key'] =   'live_0sBujqVPlOO5f92mupcUKwJ9JNUfG0U4i9U1jXs5oImfnkLouJOawkIxXHqQBG34';

const urlBreeds = `https://api.thecatapi.com/v1/breeds`;

export const fetchBreeds = () => {
  return fetch(urlBreeds)
  .then(response => {
    if (!response.ok) {
      throw new Error(response.status);
    }
    return response.json();
  })
  .then((data) => {
    const result = data.map(({ id, name }) => ({ [id]: name }));
    return result;
  })
  .catch(function (error) {
   console.log(error);
  });
}