import React, { useEffect, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getProfileById } from '../../actions/profile';
import ProfileTop from './ProfileTop';

const Profile = ({
  getProfileById,
  auth,
  profile: { loading, profile },
  match,
}) => {
  useEffect(() => {
    getProfileById(match.params.id);
  }, [getProfileById, match.params.id ]);

  return (
    <Fragment>
      {profile === null || loading ? (
        'Waiting...'
      ) : (
        <Fragment>
          PROFILE
          {auth.isAuthenticated &&
            loading === false && 
            auth.user._id === profile.user && (
             
              <Link to='/edit-profile' className='btn btn-dark'>
                Edit Profile
              </Link>
            )}
        </Fragment>
      )}
      <Link to='/profiles' className='btn btn-light'>
        Back to Profiles
      </Link>
    </Fragment>
  );
};

Profile.propTypes = {
  getProfileById: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profile,
  auth: state.auth,
});
export default connect(mapStateToProps, { getProfileById })(Profile);
