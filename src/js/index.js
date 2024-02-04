import SlimSelect from 'slim-select';
import 'slim-select/dist/slimselect.css';
import Notiflix from 'notiflix';

import { fetchBreeds, fetchCatByBreed } from './cat-api.js';

const selectElement = document.querySelector('#selectElement');
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
    if (response.status !== 200) {
      errorElement.textContent = response.data;
      loadingElement.style.display = 'none';
      messageElement.style.display = 'block';
      Notiflix.Notify.warning(response.data);
      return;
    }
    console.log('response.data: ', response.data);
    return response.data.map(({ id, name }) => ({ id, name }));
  })
  .then(breeds => {
    return breeds
      .map(({ id, name }) => `<option value="${id}">${name}</option>`)
      .join('');
  })
  .then(options => {
    selectElement.style.display = 'block';
    options = `<option value="" data-placeholder="true"></option>${options}`;
    selectElement.insertAdjacentHTML('beforeend', options);
    loadingElement.style.display = 'none';
    new SlimSelect({
      select: '#selectElement',
      settings: {
        placeholderText: '-- Select breed of cat --',
        contentLocation: document.getElementById('selectLocation'),
      },
    });
  })
  .catch(error => {
    console.log(error);
  });

selectElement.addEventListener('change', event => {
  // debugger;
  loadingElement.style.display = 'block';
  const idBreed = event.target.value;
  console.log(idBreed);
  fetchCatByBreed(idBreed)
    .then(response => {
      if (response.status !== 200) {
        errorElement.textContent = response.data;
        loadingElement.style.display = 'none';
        messageElement.style.display = 'block';
        Notiflix.Notify.warning(response.data);
        return;
      }
      loadingElement.style.display = 'block';
      console.log('response.data: ', response.data);
      return {
        name: response.data.breeds[0].name,
        description: response.data.breeds[0].description,
        temperament: response.data.breeds[0].temperament,
        lifespan: response.data.breeds[0].life_span,
        wikipedia: response.data.breeds[0].wikipedia_url,
        imgUrl: response.data.url,
      };
    })
    .then(catInfo => {
      console.log('catInfo:', catInfo);
      catInfoElement.style.display = 'flex';
      catInfoElement.textContent = '';
      const contentCatInfo = `<div class="cat-img">
      <img src="${catInfo.imgUrl}" >
    </div>
    <div class="cat-text">
      <h2 class="breed-name">${catInfo.name}</h2>
      <p class="breed-info description">${catInfo.description}</p>
      <p class="breed-info temperament"><b>Temperament:</b><br>${catInfo.temperament}</p>
      <p class="breed-info lifespan"><b>Average lifespan:</b><br>${catInfo.lifespan}</p>
      <p class="breed-info wikipedia"><b>More information:</b><br><a href="${catInfo.wikipedia}">${catInfo.wikipedia}</a></p>
    </div>
    `;
      catInfoElement.insertAdjacentHTML('beforeend', contentCatInfo);
      loadingElement.style.display = 'none';
    });
});
