import axios from 'axios';

axios.defaults.headers.common['x-api-key'] =
  'live_0sBujqVPlOO5f92mupcUKwJ9JNUfG0U4i9U1jXs5oImfnkLouJOawkIxXHqQBG34';

export const fetchBreeds = () => {
  const urlBreeds = `https://api.thecatapi.com/v1/breeds`;
  return fetch(urlBreeds)
    .then(response => {
      if (!response.ok) {
        throw new Error(response.status);
      }
      return response.json();
    })
    .then(breeds => {
      // console.log("fetchBreeds filtering starting:");
      return breeds.map(({ id, name }) => ({ id, name }));
    })
    .catch(error => {
      return error;
    });
};

export const fetchCatByBreed = breedId => {
  const urlBreed = `https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`;
  return fetch(urlBreed)
    .then(response => {
      if (!response.ok) {
        throw new Error(response.status);
      }
      return response.json();
    })
    .catch(error => {
      return error;
    })
};
