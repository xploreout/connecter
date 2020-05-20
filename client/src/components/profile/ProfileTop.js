import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const ProfileTop = ({
  profile: {
    company,
    title,
    status,
    skills,
    from,
    to,
    current,
    user: { name, avatar }
  },
}) => {
  return (
    <Fragment>
      <h1>Hello </h1>
    </Fragment>
  );
};

ProfileTop.propTypes = {
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profile,
});

export default connect(mapStateToProps)(ProfileTop);
