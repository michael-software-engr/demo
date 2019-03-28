/* eslint-disable no-undef */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import Repo from './presenters/Repo';
import User from './presenters/User';
import List from './presenters/List';

import { unconnectedLoadRepo, unconnectedLoadStargazers } from '../../redux/modules/rrweRefactored/actions';
import rrweRefactored from '../../redux/modules/rrweRefactored/index';

const rrweRefactoredModuleKey = rrweRefactored.getKey();

const loadData = (props) => {
  const { fullName } = props;
  props.loadRepo(fullName, ['description']);
  props.loadStargazers(fullName);
};

class RepoPage extends Component {
  static propTypes = {
    fullName: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    stargazers: PropTypes.arrayOf(PropTypes.shape()).isRequired,
    loadRepo: PropTypes.func.isRequired,
    loadStargazers: PropTypes.func.isRequired,

    repo: PropTypes.shape(),
    owner: PropTypes.shape(),
    stargazersPagination: PropTypes.shape()
  }

  static defaultProps = {
    repo: null,
    owner: null,
    stargazersPagination: {}
  }

  componentDidMount() {
    loadData(this.props);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.fullName !== this.props.fullName) {
      loadData(this.props.fullName);
    }
  }

  handleLoadMoreClick = () => {
    this.props.loadStargazers(this.props.fullName, true);
  }

  static renderUser(user) {
    return <User user={user} key={user.login} />;
  }

  render() {
    const { repo, owner, name } = this.props;
    if (!repo || !owner) {
      return (
        <h1>
          <i>
            Loading
            {' '}
            {name}
            {' '}
            details...
          </i>
        </h1>
      );
    }

    const { stargazers, stargazersPagination } = this.props;

    return (
      <div>
        <Repo repo={repo} owner={owner} />
        <hr />
        <List
          renderItem={RepoPage.renderUser}
          items={stargazers}
          onLoadMoreClick={this.handleLoadMoreClick}
          loadingLabel={`Loading stargazers of ${name}...`}
          {...stargazersPagination}
        />
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  // We need to lower case the login/name due to the way GitHub's API behaves.
  // Have a look at ../middleware/api.js for more details.
  const login = ownProps.match.params.login.toLowerCase();
  const name = ownProps.match.params.name.toLowerCase();

  const {
    pagination: { stargazersByRepo },
    entities: { users, repos }
  } = state[rrweRefactoredModuleKey];

  const fullName = `${login}/${name}`;
  const stargazersPagination = stargazersByRepo[fullName] || { ids: [] };
  const stargazers = stargazersPagination.ids.map(id => users[id]);

  return {
    fullName,
    name,
    stargazers,
    stargazersPagination,
    repo: repos[fullName],
    owner: users[login]
  };
};

export default withRouter(connect(mapStateToProps, {
  loadRepo: unconnectedLoadRepo,
  loadStargazers: unconnectedLoadStargazers
})(RepoPage));
