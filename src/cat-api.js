import axios from 'axios';

const apiKey =
  'live_4TmZg9qiI0rWxWleVLQTTezZe5jkFCc4ZrYcfVVRJZYXXf9obRKCWxGGhmMHhBCT';
const URL = 'https://api.thecatapi.com/v1/breeds';
const searchURL = 'https://api.thecatapi.com/v1/images/search';

axios.defaults.headers.common['x-api-key'] = apiKey;

async function fetchBreeds() {
  const response = await axios.get(URL);
  return response.data;
}

async function fetchCatByBreed(breedId) {
  const response = await axios.get(searchURL, {
    params: {
      breed_ids: breedId,
      api_key: apiKey,
    },
  });
  return response.data;
}

export { fetchBreeds, fetchCatByBreed };
