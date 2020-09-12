import React, { Fragment, Component } from "react";
import { connect } from "react-redux";
import Search from "./Search";
import RepositoryCard from "./RepositoryCard";
import Loader from "./Loader";
import Pagination from "./Pagination";
import actionFunctions from "../actions/repositoriesAction";
import { isArrayEmpty } from "../utils/helpers";

export class RepositoriesPage extends Component {
  state = {
    dataFetching: false,
    noResults: false,
    searchTerm: "",
    currentPage: null,
    maxPage: null,
  };

  onSearchButtonClick = (searchTerm) => {
    const { getRepositories } = this.props;
    this.setState({ dataFetching: true });
    getRepositories(searchTerm, 1).then((data) => {
      const divisible = data.total_count % 25 === 0;
      const valueToBeAdded = divisible ? 0 : 1;
      const pageNumber = Math.floor(data.total_count / 25) + valueToBeAdded;
      this.setState({
        dataFetching: false,
        noResults: data.items.length === 0,
        searchTerm,
        currentPage: 1,
        maxPage: pageNumber > 40 ? 40 : pageNumber,
      });
    });
  };

  jumpToPage = (page) => {
    const { getRepositories } = this.props;
    const { searchTerm, maxPage } = this.state;
    const pageNumber = Math.max(1, page);
    this.setState({ dataFetching: true });
    getRepositories(searchTerm, page).then(() => {
      this.setState({
        dataFetching: false,
        currentPage: Math.min(pageNumber, maxPage),
      });
    });
  };

  render() {
    const { repositories, totalCount } = this.props;
    const { dataFetching, noResults, currentPage, maxPage } = this.state;

    return (
      <Fragment>
        <div className="title">
          <h2>GitHub Repositories</h2>
        </div>
        <div className="search__wrapper">
          <Search onSearchButtonClick={this.onSearchButtonClick} />
        </div>
        {!dataFetching && repositories && !isArrayEmpty(repositories) && (
          <>
            <div className="cards">
              {repositories.map((repository) => (
                <RepositoryCard key={repository.id} repository={repository} />
              ))}
            </div>
            {totalCount > 25 && (
              <div className="pagination__wrapper">
                <Pagination
                  jumpToPage={this.jumpToPage}
                  currentPage={currentPage}
                  maxPage={maxPage}
                />
              </div>
            )}
          </>
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
    actionFunctions.getRepositories(dispatch, searchTerm, pageNumber),
});

export default connect(mapStateToProps, mapDispatchToProps)(RepositoriesPage);
