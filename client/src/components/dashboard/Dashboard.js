import React, { useEffect, Fragment } from 'react';
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCurrentProfile } from '../../actions/profile';
import DashboardActions from './DashboardActions';


const Dashboard = ({
  auth: { user },
  profile: { loading, profile },
  getCurrentProfile
}) => {
  useEffect(() => {
    getCurrentProfile();
  }, []);

  return loading && profile === null ? (
    <Fragment>its null profile</Fragment>
  ) : (
    <Fragment>
      <h1 className='large text-primary'>Dashboard</h1>
      <p className='lead'>
        <i className='fa fa-user'> </i>
        Welcome {user && user.name}
      </p>
      { profile === null ? (
        <Link to='/create-profile' className="btn btn-primary">Create Profile</Link>
      ) : (
        <DashboardActions />
        // <Link to='/add-experience' className="btn btn-primary">Add Experience</Link>
      )}
    </Fragment>
  );
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
