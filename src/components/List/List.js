import React, { Component } from 'react';

import Item from '../Item/index';
export default class List extends Component {
  id = 100;
  state = {
    elements: [],
    genreEl: [],
  };
  render() {
    //  console.log(this.props.arrObj.results);
    if (this.props.arrGenre != null) {
      console.log(this.props.arrGenre);
      // console.log(this.props.arrObj.results[0].genre_ids);
    }
    let elements = this.props.arrObj.results.map((item) => {
      // const { overview, ...itemProps } = item;
      let genresForItem = item.genre_ids;
      console.log(genresForItem);
      let nameGenres = genresForItem.filter((item) => {
        if (item === this.props.arrGenre.id) {
          return this.props.arrGenre.name;
        }
      });
      this.id += 1;
      return (
        <li key={this.id}>
          <Item
            setOverview={(overview) => {
              this.props.setOverview(overview);
            }}
            props={item}
            nameGenres={nameGenres}
          ></Item>
        </li>
      );
    });
    return <ul> {elements} </ul>;
  }
}
