import { apiKey } from './ApiKey';
export default class MovieServices {
  apiBase = 'https://api.themoviedb.org/3/';
  async getInfo(url) {
    try {
      const res = await fetch(url);
      if (!res.ok) {
        throw new Error(`Could not fetch ${url}`) + `, received ${res.status}`;
      }
      return await res.json();
    } catch (error) {
      console.log(error);
    }
  }
  async getPopylatiry(page) {
    try {
      return await this.getInfo(`${this.apiBase}movie/popular?api_key=${apiKey}&language=en-US&page=${page}`);
    } catch (error) {
      console.log(error);
    }
  }
  async getMovies(search = '', page = 1) {
    return await this.getInfo(
      `/search/movie?api_key=${this.API_KEY}&language=en-US&query=${search}&page=${page}&include_adult=false`
    );
  }
  async getGenre() {
    try {
      return await this.getInfo(`${this.apiBase}genre/movie/list?api_key=${apiKey}&language=en-US`);
    } catch (error) {
      console.log(error);
    }
  }
}

// let result = new MovieServices();

// console.log(result.getGenre().then((body) => console.log(body)));

// console.log(result.getPopylatiry().then((body) => console.log(body)));
