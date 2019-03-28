import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { getRoutePrefix } from '../../../routes/rrweRefactored/index';

const routePrefix = getRoutePrefix();

const User = ({ user }) => {
  const { login, avatarUrl, name } = user;

  return (
    <div className="User">
      <Link to={`/${routePrefix}/${login}`}>
        <img src={avatarUrl} alt={login} width="72" height="72" />
        <h3>
          {login}
          {' '}
          {name && (
            <span>
              (
                {name}
              )
            </span>
          )}
        </h3>
      </Link>
    </div>
  );
};

User.propTypes = {
  user: PropTypes.shape({
    login: PropTypes.string.isRequired,
    avatarUrl: PropTypes.string.isRequired,
    name: PropTypes.string
  }).isRequired
};

export default User;
