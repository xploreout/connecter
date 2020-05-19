import React, { useEffect, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getProfileById } from '../../actions/profile';

const Profile = ({
  getProfileById,
  auth,
  profile: { loading, profile },
  match,
}) => {
  useEffect(() => {
    getProfileById(match.params.id);
  }, [getProfileById]);

  console.log(profile && JSON.stringify(profile));
  return (
    <Fragment>
      {profile === null || loading ? (
        'Waiting...'
      ) : (
        <Fragment>PROFILE</Fragment>
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
