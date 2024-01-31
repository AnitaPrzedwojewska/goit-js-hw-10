import { fetchBreeds, fetchCatByBreed } from './cat-api.js';
// import SlimSelect from 'slim-select';

// new SlimSelect({
//   select: '#selectElement',
// })

const selectElement = document.querySelector('.breed-select');
const loadingElement = document.querySelector('.loader');
const errorElement = document.querySelector('.error');
const catInfoElement = document.querySelector(".cat-info");

fetchBreeds()
  .then(breeds => {
    return breeds.map(
      ({ id, name }) => `<option value="${id}">${name}</option>`).join('');
  })
  .then(options => {
    selectElement.insertAdjacentHTML('beforeend', options);
  })
  .catch(error => {
    console.log(error);
  });

selectElement.addEventListener('change', event => {
  const idBreed = event.target.value;
  console.log(idBreed);
  fetchCatByBreed(idBreed)
    .then((catInfo) => {
      console.log(catInfo);
      catInfoElement.textContent = '';
      const contentCatInfo =
        `<div class="cat__img">
        <img src="${catInfo.imgUrl}" >
      </div>
      <div class="cat__description">
        <h1>${catInfo.name}</h1>
        <p>${catInfo.description}</p>
        <p>${catInfo.temperament}</p>
      </div>
      `;
      catInfoElement.insertAdjacentHTML('beforeend', contentCatInfo);
    })
});
