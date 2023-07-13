import { apiKey } from './ApiKey';
export default class MovieServices {
  apiBase = 'https://api.themoviedb.org/3/';
  async getInfo(url) {
    try {
      const res = await fetch(url);
      if (!res.ok) {
        throw new Error(`Could not fetch ${url}) + , received ${res.status}`);
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

  async getMoviesSearch(search = 'spider', page = 1) {
    try {
      return this.getInfo(`${this.apiBase}search/movie?api_key=${apiKey}&query=${search}&page=${page}`);
    } catch (error) {
      console.log(error);
    }
  }
  async getGenre() {
    try {
      return await this.getInfo(`${this.apiBase}genre/movie/list?api_key=${apiKey}&language=en-US`);
    } catch (error) {
      console.log(error);
    }
  }
  async createGuestSession() {
    try {
      return this.getInfo(`${this.apiBase}authentication/guest_session/new?api_key=${apiKey}`);
    } catch (error) {
      console.log(error);
    }
  }

  async getGuestRated() {
    try {
      return this.getInfo(`${this.apiBase}authentication/guest_session/new?api_key=${apiKey}`);
    } catch (error) {
      console.log(error);
    }
  }

  async getRatedMovies(sessionId, page) {
    try {
      return this.getInfo(
        `${this.apiBase}guest_session/${sessionId}/rated/movies?api_key=${apiKey}&language=en-US&sort_by=created_at.asc&page=${page}`
      );
    } catch (error) {
      console.log(error);
    }
  }

  async setMovieRating(id, rating, sessionId) {
    const options = {
      method: 'POST',
      body: JSON.stringify({ value: rating }),
      headers: {
        accept: 'application/json',
        'Content-Type': 'application/json;charset=utf-8',
      },
    };
    return await fetch(`${this.apiBase}movie/${id}/rating?api_key=${apiKey}&guest_session_id=${sessionId}`, options);
  }
  async deleteMovieRating(id, sessionId) {
    const options = {
      method: 'DELETE',
      headers: {
        accept: 'application/json',
        'Content-Type': 'application/json;charset=utf-8',
      },
    };
    return await fetch(`${this.apiBase}movie/${id}/rating?api_key=${apiKey}&guest_session_id=${sessionId}`, options);
  }
}

// let result = new MovieServices();

// console.log(result.createGuestSession().then((body) => console.log(body.guest_session_id)));
