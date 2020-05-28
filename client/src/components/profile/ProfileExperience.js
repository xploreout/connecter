import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';

const ProfileExperience = ({
  experience: { _id, company, title, from, to, current },
}) => {
  return (
    <li>
      <strong>{title} </strong> at <strong>{company}</strong> from{' '}
      {<Moment format='MM/YY'>{from}</Moment>} to{' '}
      {to === null ? 'Now' : <Moment format='MM/YY'>{to}</Moment>}
    </li>
  );
};

ProfileExperience.propTypes = {
  profile: PropTypes.object.isRequired,
};

export default ProfileExperience;
