import { fetchBreeds, fetchCatByBreed } from './cat-api.js';

const breedSelect = document.querySelector('.breed-select');
const infoCat = document.querySelector('.cat-info');
const loaderInfo = document.querySelector('.loader');
const errorInfo = document.querySelector('.error');
breedSelect.style.display = 'none';
errorInfo.style.display = 'none';

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
  <br>
    <img src="${urlCat}" alt="" height="300px" width="400px">
    <h1>${catBreedObj.name}</h1>
      <p>${catBreedObj.description}</p>
      <p> <b>Temperament: </b>${catBreedObj.temperament}</p>`;
  console.log(information);
  console.log((infoCat.innerHTML = information));
}

window.addEventListener('load', () => {
  fetchBreeds()
    .then(breeds => {
      markup(breeds);
      breedSelect.style.display = 'block';
      loaderInfo.style.display = 'none';
    })
    .catch(error => {
      errorInfo.style.display = 'block';
      console.log(error);
    });
});

breedSelect.addEventListener('change', () => {
  loaderInfo.style.display = 'block';
  infoCat.style.display = 'none';
  const selectedId = breedSelect.value;
  fetchCatByBreed(selectedId)
    .then(detail => {
      markupDetail(detail);
      infoCat.style.display = 'block';
      loaderInfo.style.display = 'none';
    })
    .catch(error => {
      errorInfo.style.display = 'block';
      console.log(error);
    });
});
