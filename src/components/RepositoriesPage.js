import React, { Fragment, Component } from "react";
import { connect } from "react-redux";
import { getRepositories } from "../actions/repositoriesAction";

export class RepositoriesPage extends Component {
  render() {
    return (
      <Fragment>
        <div className="title">
          <h2>GitHub Repositories</h2>
        </div>
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
