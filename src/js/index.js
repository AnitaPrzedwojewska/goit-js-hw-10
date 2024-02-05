import SlimSelect from 'slim-select';
import 'slim-select/dist/slimselect.css';
import Notiflix from 'notiflix';

import { fetchBreeds, fetchCatByBreed } from './cat-api.js';

const selectElement = document.querySelector('.select-container');
const selector = document.querySelector('#selectElement');
const loadingElement = document.querySelector('.loader-container');
const messageElement = document.querySelector('.message-container');
const error = document.querySelector('.message');
const catInfoElement = document.querySelector('.cat-info');

// const moggieCatInfo = {
//   name: 'Moggie cat',
//   description:
//     "You didn't select any breed of cat. Therefore, information about maggie was displayed. A moggie is a non-pedigree cat of mixed or unknown ancestry. They’re friendly, low maintenance and generally pretty healthy. Most are affectionate and easy going and will fit in with other family pets, including cat-friendly dogs. This makes them ideal pets for families with children and other pets, single households and first-time pet owners. It’s no surprise that they’re the most common cat in the world. ",
//   temperament:
//     'unpredictable - some may be shy and clingy, others more independent and adventurous',
//   lifespan: '15-20',
//   wikipedia: 'https://en.wikipedia.org/wiki/Domestic_short-haired_cat',
//   imgUrl: './../images/domestic-cats-1656321647.jpg',
// };

selectElement.style.display = 'none';
loadingElement.style.display = 'block';
messageElement.style.display = 'none';
catInfoElement.style.display = 'none';

fetchBreeds()
  .then(response => {
    // console.log(response);
    if (response.status !== 200 || response.data === undefined) {
      const message =
        response.data ?? 'Oops! Something went wrong! Try reloading the page!';
      error.textContent = message;
      loadingElement.style.display = 'none';
      messageElement.style.display = 'block';
      Notiflix.Notify.warning(message);
      return;
    }
    const breeds = response.data.map(({ id, name }) => ({ id, name }));
    let options = breeds
      .map(({ id, name }) => `<option value="${id}">${name}</option>`)
      .join('');
    options = `<option value="" data-placeholder="true"></option>${options}`;
    selectElement.style.display = 'block';
    selector.insertAdjacentHTML('beforeend', options);
    loadingElement.style.display = 'none';
    new SlimSelect({
      select: '#selectElement',
      settings: {
        placeholderText: '-- Select breed of cat --',
      },
    });
  })
  .catch(err => {
    console.log(err);
  });

selector.addEventListener('change', event => {
  catInfoElement.textContent = '';
  catInfoElement.style.display = 'none';
  loadingElement.style.display = 'block';
  messageElement.style.display = 'none';
  const idBreed = event.target.value;
  fetchCatByBreed(idBreed).then(response => {
    if (response.status !== 200 || response.data === undefined) {
      const message =
        response.data ?? 'Oops! Something went wrong! Try reloading the page!';
      error.textContent = message;
      loadingElement.style.display = 'none';
      messageElement.style.display = 'block';
      Notiflix.Notify.warning(message);
      return;
    }
    loadingElement.style.display = 'block';
    const catInfo = {
      name: response.data.breeds[0].name,
      description: response.data.breeds[0].description,
      temperament: response.data.breeds[0].temperament,
      lifespan: response.data.breeds[0].life_span,
      wikipedia: response.data.breeds[0].wikipedia_url,
      imgUrl: response.data.url,
    };
    catInfo.imgUrl = catInfo.imgUrl ?? './../images/no-photo.png';
    catInfoElement.style.display = 'flex';
    const contentCatInfo = `<div class="cat-img">
          <img src="${catInfo.imgUrl}" alt="${catInfo.name}">
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
