import SlimSelect from 'slim-select';
import 'slim-select/dist/slimselect.css';
import Notiflix from 'notiflix';

import { fetchBreeds, fetchCatByBreed } from './cat-api.js';

// const selectElement = document.querySelector('#selectElement');
const selectElement = document.querySelector('.breed-select');
const loadingElement = document.querySelector('.loader-container');
const messageElement = document.querySelector('.message');
const errorElement = document.querySelector('.error');
const catInfoElement = document.querySelector('.cat-info');

selectElement.style.display = 'none';
loadingElement.style.display = 'block';
messageElement.style.display = 'none';
catInfoElement.style.display = 'none';

fetchBreeds()
.then(response => {
  console.log(response);
  if (response.status !== 200 || response.data === undefined) {
    const message =
      response.data ?? 'Oops! Something went wrong! Try reloading the page!';
    errorElement.textContent = message;
    loadingElement.style.display = 'none';
    messageElement.style.display = 'block';
    Notiflix.Notify.warning(message);
    return;
  }
  const breeds = response.data.map(({ id, name }) => ({ id, name }));
  let options = breeds
    .map(({ id, name }) => `<option value="${id}">${name}</option>`)
    .join('');
  selectElement.style.display = 'block';
  options = `<option value="" data-placeholder="true"></option>${options}`;
  console.log(options);
  selectElement.insertAdjacentHTML('beforeend', options);
  loadingElement.style.display = 'none';
  new SlimSelect({
    select: selectElement,
    settings: {
      placeholderText: '-- Select breed of cat --',
    },
  });
})
.catch(error => {
  console.log(error);
});

selectElement.addEventListener('change', event => {
  catInfoElement.textContent = '';
  catInfoElement.style.display = 'none';
  loadingElement.style.display = 'block';
  messageElement.style.display = 'none';
  const idBreed = event.target.value;
  console.log(idBreed);
  fetchCatByBreed(idBreed).then(response => {
    if (response.status !== 200 || response.data === undefined) {
      const message =
        response.data ?? 'Oops! Something went wrong! Try reloading the page!';
      errorElement.textContent = message;
      loadingElement.style.display = 'none';
      messageElement.style.display = 'block';
      Notiflix.Notify.warning(message);
      return;
    }
    loadingElement.style.display = 'block';
    console.log('response.data: ', response.data);
    const catInfo = {
      name: response.data.breeds[0].name,
      description: response.data.breeds[0].description,
      temperament: response.data.breeds[0].temperament,
      lifespan: response.data.breeds[0].life_span,
      wikipedia: response.data.breeds[0].wikipedia_url,
      imgUrl: response.data.url,
    };
    console.log('catInfo:', catInfo);
    catInfoElement.style.display = 'flex';
    const contentCatInfo = `<div class="cat-img">
          <img src="${catInfo.imgUrl}" >
        </div>
        <div class="cat-text">
          <h2 class="breed-name">${catInfo.name}</h2>
          <p class="breed-info description">${catInfo.description}</p>
          <p class="breed-info temperament"><b>Temperament:</b><br>${catInfo.temperament}</p>
          <p class="breed-info lifespan"><b>Average lifespan:</b><br>${catInfo.lifespan}</p>
          <p class="breed-info wikipedia"><b>More information:</b><br><a href="${catInfo.wikipedia}">${catInfo.wikipedia}</a></p>
        </div>`;
    catInfoElement.insertAdjacentHTML('beforeend', contentCatInfo);
    loadingElement.style.display = 'none';
  });
});
