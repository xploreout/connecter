import React, { useEffect, Fragment } from 'react';
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCurrentProfile, deleteAccount } from '../../actions/profile';
import DashboardActions from './DashboardActions';
import Experience from './Experience';
import Education from './Education';


const Dashboard = ({
  auth: { user },
  profile: { loading, profile },
  getCurrentProfile,
  deleteAccount
}) => {
  useEffect(() => {
    getCurrentProfile();
  }, [getCurrentProfile]);

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
        <Fragment>
          <DashboardActions />
          <Experience experience={profile.experience} /> 
          <Education education={profile.education} />
          <div className='my-2'>
            <button className='btn btn-danger' onClick={()=> deleteAccount()}>
              <i className='fas fa-user-minus'></i> Delete My Account</button>
          </div>
        </Fragment>
      
        // <Link to='/add-experience' className="btn btn-primary">Add Experience</Link>
      )}
    </Fragment>
  );
};

Dashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  deleteAccount: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  profile: state.profile
});
export default connect(mapStateToProps, { getCurrentProfile, deleteAccount })(Dashboard);
