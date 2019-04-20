import React, { Component } from 'react';
import './Compose.css';

export default class Compose extends Component {

  render() {
    return (
      <div className="compose">
        <input
          type="text"
          value={this.props.text}
          onChange={this.props.onInputChange}
          className="compose-input"
          placeholder="Type a message, @name"
        />

        {
          this.props.rightItems
        }
      </div>
    );
  }
}