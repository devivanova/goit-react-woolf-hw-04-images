import axios from 'axios';

axios.defaults.baseURL = 'https://pixabay.com/api/';
const API_KEY = '12068791-7815ebab010f154bc5bc1765e';

export const findImage = (query, page) => {
  const params = new URLSearchParams({
    q: query,
    page: page,
    key: API_KEY,
    image_type: 'photo',
    orientation: 'horizontal',
    per_page: 12,
  });

  return axios.get(`?${params}`).then(response => response.data);
};