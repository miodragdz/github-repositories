import React, { Component } from "react";

export class Search extends Component {
  state = {
    searchTerm: '',
  };

  onHandleChange = e => {
    this.setState({
      searchTerm: e.target.value
    });
  }

  onHandleSubmit = e => {
    const { onSearchButtonClick } = this.props;
    const { searchTerm } = this.state;
    e.preventDefault();
    onSearchButtonClick(searchTerm);
  }

  render() {   
    const { searchTerm } = this.state;

    return (
      <div className="search">
        <form className="form">
          <input
            id="location"
            value={searchTerm}
            placeholder="Search by name"
            onChange={this.onHandleChange}
            className="form__input"
          />
          <button className="form__button" disabled={!searchTerm} onClick={this.onHandleSubmit} type="submit">Search</button>        
        </form>
      </div>
    );
  }
}

export default Search;
