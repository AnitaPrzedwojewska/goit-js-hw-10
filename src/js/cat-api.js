import axios from 'axios';

// axios.defaults.headers.common['x-api-key'] =   'live_0sBujqVPlOO5f92mupcUKwJ9JNUfG0U4i9U1jXs5oImfnkLouJOawkIxXHqQBG34';
const apiKey =
  'live_0sBujqVPlOO5f92mupcUKwJ9JNUfG0U4i9U1jXs5oImfnkLouJOawkIxXHqQBG34';

export const fetchBreeds = () => {
  const urlBreeds = `https://api.thecatapi.com/v1/breeds?key_api=${apiKey}`;
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
  const urlBreed = `https://api.thecatapi.com/v1/images/search?api_key=${apiKey}&breed_ids=${breedId}`;
  return fetch(urlBreed)
    .then((response) => {
      if (!response.ok) {
        console.log(response.status);
        throw new Error(response.status);
      }
      return response.json();
    })
    .then((catObject) => {
      return {
        name: catObject[0].breeds[0].name,
        description: catObject[0].breeds[0].description,
        temperament: catObject[0].breeds[0].temperament,
        imgUrl: catObject[0].url
      };
    })
    .catch(error => {
      console.log(error);
      return error;
    })
};
