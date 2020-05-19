import React, { Component } from 'react';

class TextInput extends Component {
  render() {
    return (
      <div className="text-input">
        <label
          htmlFor={this.props.name}
          className="text-input__label"
        >
          {this.props.label}
          <span className="text-input__sub-label">{this.props.subLabel}</span>
        </label>
        <input
          name={this.props.name}
          type="text"
          value={this.props.value}
          onChange={this.props.onChange}
        />
      </div>
    );
  }
}

export default TextInput;
