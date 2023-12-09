import axios from 'axios';

axios.defaults.baseURL = 'https://pixabay.com/api/';

const newApiKey = '22698692-493badbd00e8d258bf66e0e0d';

async function fatchHits(searchQuery, page) {
  const params = {
    key: newApiKey,
    q: `${searchQuery}`,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    per_page: 12,
    page: `${page}`,
    lang: 'en',
  };

  try {
    const response = await axios.get('', { params });
    const hitsData = response.data;

    return hitsData;
  } catch (error) {
    return;
  }
}

export { fatchHits };
