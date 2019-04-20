import React, { Component } from 'react';
import './ToolbarButton.css';

export default class ToolbarButton extends Component {
  render() {
    const { icon } = this.props;
    return (
      <i onClick={this.props.onClick} className={`toolbar-button ${icon}`} />
    );
  }
}