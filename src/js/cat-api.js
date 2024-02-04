import axios from 'axios';

const apiKey =
  'live_0sBujqVPlOO5f92mupcUKwJ9JNUfG0U4i9U1jXs5oImfnkLouJOawkIxXHqQBG34';
axios.defaults.headers.common['x-api-key'] = apiKey;

export const fetchBreeds = () => {
  const urlBreeds = `https://api.thecatapi.com/v1/breeds?key_api=${apiKey}`;
  return axios(urlBreeds)
    .then(response => {
      return { status: response.status, data: response.data };
    })
    .catch(error => {
      return handleError(error);
    });
};

export const fetchCatByBreed = breedId => {
  console.log('breedId: ', breedId);
  const urlBreedInfo = `https://api.thecatapi.com/v1/images/search?api_key=${apiKey}&breed_ids=${breedId}`;
  return axios(urlBreedInfo)
    .then(response => {
      console.log('response: ', response);
      console.log('response.data[0]: ', response.data[0]);
      return { status: response.status, data: response.data[0] };
    })
    .catch(error => {
      return handleError(error);
    });
};

// .then(catObject => {
//       return {
//         name: catObject[0].breeds[0].name,
//         description: catObject[0].breeds[0].description,
//         temperament: catObject[0].breeds[0].temperament,
//         imgUrl: catObject[0].url,
//       };
//     })

const handleError = error => {
  // debugger;
  if (error.response) {
    // console.log('error.response: ', error.response);
    // console.log('error.response.status: ', error.response.status);
    // console.log('error.response.data: ', error.response.data.message);
    return {
      status: error.response.status,
      data: error.response.data.message,
    };
  } else if (error.request) {
    return {
      status: error.request.response.status,
      data: error.request.response.data.message,
    };
  } else {
    return {
      status: error.status,
      data: error.message,
    };
  }
  return {
    status: error.status,
    data: error.config,
  };
};
