import React, { Component } from 'react';

import './GenreList';
import { GenresConsumer } from '../Context/context';
export default class GenreList extends Component {
  id = 0;
  render() {
    return (
      <GenresConsumer>
        {(arrGenre) => {
          if (this.props.arrGenreId && arrGenre) {
            if (this.props.arrGenreId.length === 0) {
              return <div>Genres not found</div>;
            }
            let elements = this.props.arrGenreId.map((item) => {
              for (let key in arrGenre.genres) {
                if (arrGenre.genres[key].id === item) {
                  this.id += 1;
                  return <li key={this.id}>{arrGenre.genres[key].name}</li>;
                }
              }
            });
            return <ul>{elements}</ul>;
          }
          return null;
        }}
      </GenresConsumer>
    );
  }
}
