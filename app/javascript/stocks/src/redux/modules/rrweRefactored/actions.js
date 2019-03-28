import { CALL_API } from '../../middlewares/api';
import { callApi, Schemas } from './middleware';
import { getModuleKey } from './module';

const moduleKey = getModuleKey();

export const USER_REQUEST = 'RRWE_REFACTORED/USER_REQUEST';
export const USER_SUCCESS = 'RRWE_REFACTORED/USER_SUCCESS';
export const USER_FAILURE = 'RRWE_REFACTORED/USER_FAILURE';

// Fetches a single user from Github API.
// Relies on the custom API middleware defined in the API middleware file.
const fetchUser = login => ({
  [CALL_API]: {
    types: [USER_REQUEST, USER_SUCCESS, USER_FAILURE],
    endpoint: `users/${login}`,
    schema: Schemas.USER
  },
  callApi
});

// Fetches a single user from Github API unless it is cached.
// Relies on Redux Thunk middleware.
export const unconnectedLoadUser = (login, requiredFields = []) => (dispatch, getState) => {
  const user = getState()[moduleKey].entities.users[login];

  if (user && requiredFields.every(key => Object.prototype.hasOwnProperty.call(user, key))) {
    return null;
  }

  return dispatch(fetchUser(login));
};

export const REPO_REQUEST = 'RRWE_REFACTORED/REPO_REQUEST';
export const REPO_SUCCESS = 'RRWE_REFACTORED/REPO_SUCCESS';
export const REPO_FAILURE = 'RRWE_REFACTORED/REPO_FAILURE';

// Fetches a single repository from Github API.
// Relies on the custom API middleware defined in ../middleware/api.js.
const fetchRepo = fullName => ({
  [CALL_API]: {
    types: [REPO_REQUEST, REPO_SUCCESS, REPO_FAILURE],
    endpoint: `repos/${fullName}`,
    schema: Schemas.REPO
  },
  callApi
});

// Fetches a single repository from Github API unless it is cached.
// Relies on Redux Thunk middleware.
export const unconnectedLoadRepo = (fullName, requiredFields = []) => (dispatch, getState) => {
  const repo = getState()[moduleKey].entities.repos[fullName];

  if (repo && requiredFields.every(key => Object.prototype.hasOwnProperty.call(repo, key))) {
    return null;
  }

  return dispatch(fetchRepo(fullName));
};

export const STARRED_REQUEST = 'RRWE_REFACTORED/STARRED_REQUEST';
export const STARRED_SUCCESS = 'RRWE_REFACTORED/STARRED_SUCCESS';
export const STARRED_FAILURE = 'RRWE_REFACTORED/STARRED_FAILURE';

// Fetches a page of starred repos by a particular user.
// Relies on the custom API middleware defined in ../middleware/api.js.
const fetchStarred = (login, nextPageUrl) => ({
  login,
  [CALL_API]: {
    types: [STARRED_REQUEST, STARRED_SUCCESS, STARRED_FAILURE],
    endpoint: nextPageUrl,
    schema: Schemas.REPO_ARRAY
  },
  callApi
});

// Fetches a page of starred repos by a particular user.
// Bails out if page is cached and user didn't specifically request next page.
// Relies on Redux Thunk middleware.
export const unconnectedLoadStarred = (login, nextPage) => (dispatch, getState) => {
  const {
    nextPageUrl = `users/${login}/starred`,
    pageCount = 0
  } = getState()[moduleKey].pagination.starredByUser[login] || {};

  if (pageCount > 0 && !nextPage) {
    return null;
  }

  return dispatch(fetchStarred(login, nextPageUrl));
};

export const STARGAZERS_REQUEST = 'RRWE_REFACTORED/STARGAZERS_REQUEST';
export const STARGAZERS_SUCCESS = 'RRWE_REFACTORED/STARGAZERS_SUCCESS';
export const STARGAZERS_FAILURE = 'RRWE_REFACTORED/STARGAZERS_FAILURE';

// Fetches a page of stargazers for a particular repo.
// Relies on the custom API middleware defined in ../middleware/api.js.
const fetchStargazers = (fullName, nextPageUrl) => ({
  fullName,
  [CALL_API]: {
    types: [STARGAZERS_REQUEST, STARGAZERS_SUCCESS, STARGAZERS_FAILURE],
    endpoint: nextPageUrl,
    schema: Schemas.USER_ARRAY
  },
  callApi
});

// Fetches a page of stargazers for a particular repo.
// Bails out if page is cached and user didn't specifically request next page.
// Relies on Redux Thunk middleware.
export const unconnectedLoadStargazers = (fullName, nextPage) => (dispatch, getState) => {
  const {
    nextPageUrl = `repos/${fullName}/stargazers`,
    pageCount = 0
  } = getState()[moduleKey].pagination.stargazersByRepo[fullName] || {};

  if (pageCount > 0 && !nextPage) {
    return null;
  }

  return dispatch(fetchStargazers(fullName, nextPageUrl));
};

export const RESET_ERROR_MESSAGE = 'RRWE_REFACTORED/RESET_ERROR_MESSAGE';

// Resets the currently visible error message.
export const unconnectedResetErrorMessage = () => ({
  type: RESET_ERROR_MESSAGE
});
