import { fetchBreeds, fetchCatByBreed } from './cat-api.js';

const breedSelect = document.querySelector('.breed-select');

function markup(response) {
  const joinOptions = response
    .map(element => `<option value="${element.id}">${element.name}</option>`)
    .join('');
  breedSelect.innerHTML = joinOptions;
}

window.addEventListener('load', () => {
  fetchBreeds()
    .then(breeds => markup(breeds))
    .catch(error => console.log(error));
});

breedSelect.addEventListener('change', () => {
  const selectedId = this.breedSelect;
  fetchCatByBreed(selectedId)
    .then(detail => console.log(detail))
    .catch(error => console.log(error));
});
