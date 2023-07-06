import React, { Component } from 'react';

import Item from '../Item/index';
import './List.css';
export default class List extends Component {
  id = 100;
  state = {
    elements: [],
    genreEl: [],
  };
  render() {
    let elements = this.props.arrObj.results.map((item) => {
      // const { overview, ...itemProps } = item;
      // let genresForItem = item.genre_ids;
      // let nameGenres = genresForItem.filter((item) => {
      //   if (item === this.props.arrGenre.id) {
      //     return this.props.arrGenre.name;
      //   }
      // });
      this.id += 1;
      return (
        <li key={this.id}>
          {/* <Item setOverview={this.props.setOverview} info={item} nameGenres={nameGenres}></Item> */}
          <Item setOverview={this.props.setOverview} info={item}></Item>
        </li>
      );
    });
    return <ul className="list-item">{elements}</ul>;
  }
}
