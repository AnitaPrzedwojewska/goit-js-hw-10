import { fetchBreeds } from './cat-api.js';
// import SlimSelect from 'slim-select';

// new SlimSelect({
//   select: '#selectElement',
// })

let catBreeds = fetchBreeds();

const selectElement = document.querySelector('.breed-select');

console.log(catBreeds);
// for (let i = 0; i < catBreeds.length; i++) {
//   console.log(`Id: ${catBreeds[i].id}; Nazwa: ${catBreeds[i].name}`);
// }