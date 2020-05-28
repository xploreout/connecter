import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

const ProfileAbout = ({
  profile: {
    bio,
    skills,
    user: { name },
  },
}) => {
  return (
    <div className='profile-about bg-light p-1'>
      {bio && (
        <Fragment>
          <h2>{name.trim().split(' ')[0]}s Bio</h2>
          <div className='p-2'>{bio}</div>
          <div className='line' />
        </Fragment>
      )}
      <h2 className='text-primary'>Skill Set</h2>
      {skills && (
        <div className='skills'>
          {skills.map((skill, ind) => (
            <span key={ind} className='p-1'>
              <i className='fas fa-check' /> {skill}{' '}
            </span>
          ))}
        </div>
      )}
    </div>
  );
};

ProfileAbout.propTypes = {
  profile: PropTypes.object.isRequired,
};

export default ProfileAbout;
