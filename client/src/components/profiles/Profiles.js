import React, { useEffect, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getProfiles } from '../../actions/profile';
import ProfileItem from './ProfileItem';

const Profiles = ({ profile: { profiles, loading }, getProfiles }) => {
  useEffect(() => {
    getProfiles();
  }, [getProfiles]);

  return (
    <Fragment>
      {loading ? (
        'loading...'
      ) : (
        <Fragment>
          <h1 className='large text-primary'>Developers</h1>
          <p className="lead">
           <i className="fab"></i> 
          </p>
          <div className="profiles">
            {profiles.length > 0 ? (profiles.map(profile => (<ProfileItem key={profile._id} profile={profile}/>)))
             : (<h4>No profiles...</h4>)}
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

Profiles.propTypes = {
  getProfiles: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile
});
export default connect(mapStateToProps, { getProfiles })(Profiles);
