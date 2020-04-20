import React, { useEffect, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { getCurrentProfile } from '../../actions/profile';

const Dashboard = ({
  getCurrentProfile,
  auth: { user },
  profile: { profile, loading }
}) => {
  useEffect(() => {
    getCurrentProfile();
  }, [getCurrentProfile]);

  console.log('user', user);
  console.log('profile', profile);
  console.log('loading', loading);
  return (
    <Fragment>
      { profile && loading ? (
          <Fragment>
            <h1 className='large text-primary'>Dashboard</h1>
            <p>
              <i className='fa fa-user'></i>
              Welcome {user && user.name}
            </p>
          </Fragment>
        ) : (
          <Fragment>
            <h1>Please set up your profile</h1>
          </Fragment>
        )
      }
    </Fragment>
  )
};

Dashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  profile: state.profile
});
export default connect(mapStateToProps, { getCurrentProfile })(Dashboard);
