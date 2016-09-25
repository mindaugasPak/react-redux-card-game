import React, { Component, PropTypes } from 'react';

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export default class NewPlayerForm extends Component {
  static propTypes = {
    playerName: PropTypes.string.isRequired,
    onSubmit: PropTypes.func.isRequired,
  };

  state = { nameInput: '' }

  onChangeHandler = (event) => {
    this.setState({ nameInput: event.target.value });
  }

  onSubmitHandler = (event) => {
    event.preventDefault();
    this.props.onSubmit(capitalizeFirstLetter(this.state.nameInput));
    this.clearForm();
  }

  clearForm = () => {
    this.setState({ nameInput: '' });
  }

  render() {
    return (
      <form onSubmit={this.onSubmitHandler}>
        <input
          type="text"
          onChange={this.onChangeHandler}
          value={this.state.nameInput}
        />
        <input type="submit" value="Save" />
      </form>
    );
  }
}
