import axios from 'axios';

export const fetchTopManga = async () => {
  try {
    const response = await axios.get('http://68.183.214.2:8666/api/v1/top-manga/');
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
