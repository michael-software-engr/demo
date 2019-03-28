/* eslint-disable no-undef */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { Segment } from 'semantic-ui-react';

import zip from 'lodash/zip';

import User from './presenters/User';
import Repo from './presenters/Repo';
import List from './presenters/List';

import { unconnectedLoadUser, unconnectedLoadStarred } from '../../redux/modules/rrweRefactored/actions';
import rrweRefactored from '../../redux/modules/rrweRefactored/index';

const rrweRefactoredModuleKey = rrweRefactored.getKey();

const loadData = ({ login, loadUser, loadStarred }) => {
  loadUser(login, ['name']);
  loadStarred(login);
};

class UserPage extends Component {
  static propTypes = {
    login: PropTypes.string.isRequired,
    starredRepos: PropTypes.arrayOf(PropTypes.shape()).isRequired,
    starredRepoOwners: PropTypes.arrayOf(PropTypes.shape()).isRequired,
    loadUser: PropTypes.func.isRequired,
    loadStarred: PropTypes.func.isRequired,

    user: PropTypes.shape(),
    starredPagination: PropTypes.shape(),
  }

  static defaultProps = {
    user: null,
    starredPagination: {}
  }

  componentDidMount() {
    loadData(this.props);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.login !== this.props.login) {
      loadData(this.props);
    }
  }

  handleLoadMoreClick = () => {
    this.props.loadStarred(this.props.login, true);
  }

  static renderRepo([repo, owner]) {
    return (
      <Repo
        repo={repo}
        owner={owner}
        key={repo.fullName}
      />
    );
  }

  render() {
    const { user, login } = this.props;
    if (!user) {
      return (
        <h1>
          <i>
            Loading
            {' '}
            {login}
            {"'s profile..."}
          </i>
        </h1>
      );
    }

    const { starredRepos, starredRepoOwners, starredPagination } = this.props;
    return (
      <Segment
        className="App--RrweRefactored--UserPage"
        vertical
      >
        <User user={user} />
        <hr />
        <List
          renderItem={UserPage.renderRepo}
          items={zip(starredRepos, starredRepoOwners)}
          onLoadMoreClick={this.handleLoadMoreClick}
          loadingLabel={`Loading ${login}'s starred...`}
          {...starredPagination}
        />
      </Segment>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  // We need to lower case the login due to the way GitHub's API behaves.
  // Have a look at ../middleware/api.js for more details.
  const login = ownProps.match.params.login.toLowerCase();

  const {
    pagination: { starredByUser },
    entities: { users, repos }
  } = state[rrweRefactoredModuleKey];

  const starredPagination = starredByUser[login] || { ids: [] };
  const starredRepos = starredPagination.ids.map(id => repos[id]);
  const starredRepoOwners = starredRepos.map(repo => users[repo.owner]);

  return {
    login,
    starredRepos,
    starredRepoOwners,
    starredPagination,
    user: users[login]
  };
};

export default withRouter(connect(mapStateToProps, {
  loadUser: unconnectedLoadUser,
  loadStarred: unconnectedLoadStarred
})(UserPage));
