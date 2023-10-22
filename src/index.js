import { fetchBreeds, fetchCatByBreed } from './cat-api.js';
import SlimSelect from 'slim-select';
import 'slim-select/dist/slimselect.css';
import './loader.css';
import Notiflix from 'notiflix';

const breedSelect = document.querySelector('.breed-select');
const infoCat = document.querySelector('.cat-info');
const loaderInfo = document.querySelector('.loader');
const loaderModal = document.querySelector('.loader-modal');
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
  infoCat.innerHTML = information;
}

window.addEventListener('load', () => {
  loaderModal.classList.toggle('is-hidden');
  fetchBreeds()
    .then(breeds => {
      markup(breeds);
      breedSelect.style.display = 'block';
      loaderModal.classList.toggle('is-hidden');
      loaderInfo.style.display = 'none';
      errorInfo.style.display = 'none';

      new SlimSelect({
        select: breedSelect,
        settings: {
          showSearch: true,
          searchPlaceholder: 'Buscar',
          maxValuesShown: 20,
        },
      });
    })
    .catch(error => {
      Notiflix.Notify.failure(errorInfo.textContent);
      // errorInfo.style.display = 'block')
      loaderInfo.style.display = 'none';
      console.log(errorInfo.textContent);
    });
});

breedSelect.addEventListener('change', () => {
  loaderModal.classList.toggle('is-hidden');
  infoCat.style.display = 'none';
  const selectedId = breedSelect.value;
  fetchCatByBreed(selectedId)
    .then(detail => {
      markupDetail(detail);
      infoCat.style.display = 'block';
      loaderModal.classList.toggle('is-hidden');
      loaderInfo.style.display = 'none';
      errorInfo.style.display = 'none';
    })
    .catch(error => {
      Notiflix.Notify.failure(errorInfo.textContent);
      //   errorInfo.style.display = 'block';
      loaderInfo.style.display = 'none';
      console.log(error);
    });
});
