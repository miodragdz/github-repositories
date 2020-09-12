import React, { Fragment, Component } from "react";
import { connect } from "react-redux";
import Search from "./Search";
import RepositoryCard from "./RepositoryCard";
import Loader from "./Loader";
import { getRepositories } from "../actions/repositoriesAction";
import { isArrayEmpty } from "../utils/helpers";

export class RepositoriesPage extends Component {
  state = {
    dataFetching: false,
    noResults: false,
  };

  onSearchButtonClick = (searchTerm) => {
    const { getRepositories } = this.props;
    this.setState({ dataFetching: true });
    getRepositories(searchTerm, 1).then((data) => {
      this.setState({
        dataFetching: false,
        noResults: data.items.length === 0,
      });
    });
  };

  render() {
    const { repositories } = this.props;
    const { dataFetching, noResults } = this.state;
    return (
      <Fragment>
        <div className="title">
          <h2>GitHub Repositories</h2>
        </div>
        <div className="search__wrapper">
          <Search onSearchButtonClick={this.onSearchButtonClick} />
        </div>
        {!dataFetching && repositories && !isArrayEmpty(repositories) && (
          <div className="cards">
            {repositories.map((repository) => (
              <RepositoryCard key={repository.id} repository={repository} />
            ))}
          </div>
        )}
        {!dataFetching && noResults && isArrayEmpty(repositories) && (
          <h2 className="message">
            No repositories available for that search, please try some other!
          </h2>
        )}
        {dataFetching && <Loader />}
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    totalCount: state.repositories.total_count,
    repositories: state.repositories.items,
  };
};

const mapDispatchToProps = (dispatch) => ({
  getRepositories: (searchTerm, pageNumber) =>
    getRepositories(dispatch, searchTerm, pageNumber),
});

export default connect(mapStateToProps, mapDispatchToProps)(RepositoriesPage);
