import { apiKey } from './ApiKey';
export default class MovieServices {
  apiBase = 'https://api.themoviedb.org/3/';
  async getPopylatiry(page) {
    try {
      const res = await fetch(`${this.apiBase}movie/popular?api_key=${apiKey}&language=en-US&page=${page}`);
      if (!res.ok) {
        throw new Error(`Error received ${res.status}`);
      }
      return res.json();
    } catch (error) {
      console.log(error);
    }
  }

  async getGenre() {
    try {
      const res = await fetch(`${this.apiBase}genre/movie/list?api_key=${apiKey}&language=en-US`);
      if (!res.ok) {
        throw new Error(`Error received ${res.status}`);
      }
      return res.json();
    } catch (error) {
      console.log(error);
    }
  }
}

let result = new MovieServices();

console.log(result.getGenre().then((body) => console.log(body)));
