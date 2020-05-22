import React, { Component } from 'react';

class TextInput extends Component {
  render() {
    const classes = `text-input__label
    ${this.props.subLabel ? 'text-input__label--with-sublabel' : ''}`;

    return (
      <div
        className="text-input"
        style={this.props.style}
      >
        <label
          htmlFor={this.props.name}
          className={classes}
        >
          {this.props.label}
          {this.props.subLabel && (
            <span className="text-input__sub-label text__small"><br/>{this.props.subLabel}</span>
          )}
        </label>
        <input
          name={this.props.name}
          type="text"
          value={this.props.value}
          onChange={this.props.onChange}
          className="text__all-caps text__bold text__heading"
        />
      </div>
    );
  }
}

export default TextInput;
