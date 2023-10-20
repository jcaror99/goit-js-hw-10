import { fetchBreeds, fetchCatByBreed } from './cat-api.js';

const breedSelect = document.querySelector('.breed-select');
const infoCat = document.querySelector('.cat-info');

function markup(response) {
  const joinOptions = response
    .map(element => `<option value="${element.id}">${element.name}</option>`)
    .join('');
  breedSelect.innerHTML = joinOptions;
}

function markupDetail(response) {
  const catBreedObj = response[0].breeds[0];
  const urlCat = response[0].url;
  const information = `
    <img src="${urlCat}" alt="" height="300px" width="400px">
    <h1>${catBreedObj.name}</h1>
      <p>${catBreedObj.description}</p>
      <p> <b>Temperament: </b>${catBreedObj.temperament}</p>`;
  console.log(information);
  console.log((infoCat.innerHTML = information));
}

window.addEventListener('load', () => {
  fetchBreeds()
    .then(breeds => markup(breeds))
    .catch(error => console.log(error));
});

breedSelect.addEventListener('change', () => {
  const selectedId = breedSelect.value;
  fetchCatByBreed(selectedId)
    .then(detail => markupDetail(detail))
    .catch(error => console.log(error));
});
