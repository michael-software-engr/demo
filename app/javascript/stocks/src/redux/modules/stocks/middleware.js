// TODO: pagination (also in the back end) and schema-ization.

import { camelizeKeys } from 'humps';

import { joinYearMonthDay } from '../../../lib/index';
import { STOCKS_SUCCESS, SET_ER_DATE } from './actions/types';
import { QUERY_PARAM_DATE } from './module';
import stocksSuccess from './lib/stocksSuccess';

const API_ROOT = '/';
// const API_ROOT = 'http://localhost:3000/';
// ... not an actual middleware. This is a function needed by a middleware.
export const callApi = (endpoint) => { /* eslint-disable-line import/prefer-default-export */
  const fullUrl = API_ROOT + endpoint;

  return fetch(fullUrl)
    .then(response => response.json().then((json) => {
      if (!response.ok) {
        return Promise.reject(json);
      }

      const camelizedJson = camelizeKeys(json);

      return camelizedJson;
    }));
};

export const doUpdateAddress = (date) => {
  const newQuery = [
    QUERY_PARAM_DATE, joinYearMonthDay(date, { isMoment: true, isParam: true })
  ].join('=');

  window.history.pushState('...', '...', `/stocks#stocks?${newQuery}`);
};

export const updateAddress = () => next => (action) => {
  const { type } = action;

  switch (type) {
    case STOCKS_SUCCESS: {
      const { defaultErDate, erDate } = stocksSuccess(action);
      doUpdateAddress(erDate || defaultErDate);
      break;
    }

    case SET_ER_DATE: {
      doUpdateAddress(action.payload);
      break;
    }

    default:
  }

  return next(action);
};


// ---- original ---- //

// import * as normalizr from 'normalizr';
// import { camelizeKeys } from 'humps';

// // Extracts the next page URL from Github API response.
// const getNextPageUrl = (response) => {
//   const link = response.headers.get('link');
//   if (!link) {
//     return null;
//   }

//   const nextLink = link.split(',').find(s => s.indexOf('rel="next"') > -1);
//   if (!nextLink) {
//     return null;
//   }

//   return nextLink.trim().split(';')[0].slice(1, -1);
// };

// const API_ROOT = 'https://api.github.com/';

// // Fetches an API response and normalizes the result JSON according to schema.
// // This makes every API response have the same shape, regardless of how nested it was.
// export const callApi = (endpoint, schema) => {
//   const fullUrl = (endpoint.indexOf(API_ROOT) === -1) ? API_ROOT + endpoint : endpoint;

//   return fetch(fullUrl)
//     .then(response => response.json().then((json) => {
//       if (!response.ok) {
//         return Promise.reject(json);
//       }

//       const camelizedJson = camelizeKeys(json);
//       const nextPageUrl = getNextPageUrl(response);

//       return Object.assign({}, normalizr.normalize(camelizedJson, schema), { nextPageUrl });
//     }));
// };

// // We use this Normalizr schemas to transform API responses from a nested form
// // to a flat form where repos and users are placed in `entities`, and nested
// // JSON objects are replaced with their IDs. This is very convenient for
// // consumption by reducers, because we can easily build a normalized tree
// // and keep it updated as we fetch more data.

// // Read more about Normalizr: https://github.com/paularmstrong/normalizr

// // GitHub's API may return results with uppercase letters while the query
// // doesn't contain any. For example, "someuser" could result in "SomeUser"
// // leading to a frozen UI as it wouldn't find "someuser" in the entities.
// // That's why we're forcing lower cases down there.

// const userSchema = new normalizr.schema.Entity('users', {}, {
//   idAttribute: user => user.login.toLowerCase()
// });

// const repoSchema = new normalizr.schema.Entity('repos', {
//   owner: userSchema
// }, {
//   idAttribute: repo => repo.fullName.toLowerCase()
// });

// // Schemas for Github API responses.
// export const Schemas = {
//   USER: userSchema,
//   USER_ARRAY: [userSchema],
//   REPO: repoSchema,
//   REPO_ARRAY: [repoSchema]
// };
