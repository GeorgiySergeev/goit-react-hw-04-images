import { fatchHits } from './api-servise';

export async function loadData(query, page) {
  const response = await fatchHits(query, page);
  if (response.hits.length === 0) {
    alert('No images find!');
    return { hits: [] };
  }
  return response;
}
