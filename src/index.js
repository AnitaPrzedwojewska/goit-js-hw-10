import { fetchBreeds, fetchCatByBreed } from './cat-api.js';
// import SlimSelect from 'slim-select';

// new SlimSelect({
//   select: '#selectElement',
// })

const selectElement = document.querySelector('.breed-select');

const catBreedsOptions = fetchBreeds().then(breeds => {
  console.log("breeds options:");
  console.log(breeds);
  // let options = '';
  const selectOptions = breeds.map(
    ({ id, name }) => `<option value="${id}">${name}</option>`).join('');
  selectElement.insertAdjacentHTML('beforeend', selectOptions);
  });