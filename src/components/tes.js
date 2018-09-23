import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';
import React, { Component } from 'react';

export default class Tes extends React.Component {
  constructor(props) {
    super(props);
    this.state = {items: ['hello', 'world', 'click', 'me']};
    this.handleAdd = this.handleAdd.bind(this);
  }

  handleAdd() {
    const newItems = this.state.items.concat([
      prompt('Enter some text')
    ]);
    this.setState({items: newItems});
  }

  handleRemove(i) {
    let newItems = this.state.items.slice();
    newItems.splice(i, 1);
    this.setState({items: newItems});
  }

  render() {

    return (
      <div>
        <CSSTransitionGroup
          transitionName="example"
          transitionAppear={true}
          transitionAppearTimeout={500}
          transitionEnter={false}
          transitionLeave={false}>
          <h1>Fading at Initial Mount</h1>
        </CSSTransitionGroup>
      </div>
    );
  }
}
