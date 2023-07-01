import { apiKey } from './ApiKey';
export default class MovieServices {
  apiBase = 'https://api.themoviedb.org/3/';
  async getPopylatiry(page) {
    try {
      const res = await fetch(
        //
        `${this.apiBase}movie/popular?api_key=${apiKey}&language=en-US&page=${page}`
      );
      if (!res.ok) {
        throw new Error(`Error received ${res.status}`);
      }
      return res.json();
    } catch (error) {
      console.log(error);
    }
  }
  async getI(page) {
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: 'Bearer cc7392400045dc847a4b3db071fb1e44',
      },
    };
    // try {
    const res = await fetch(
      `https://api.themoviedb.org/3/search/movie?query=cc7392400045dc847a4b3db071fb1e44&include_adult=false&language=en-US&page=${page}`,
      options
    )
      .then((response) => response.json())
      .then((response) => console.log(response))
      .catch((err) => console.error(err));
    return res.json();
  }
}
