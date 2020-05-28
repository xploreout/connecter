import React from 'react'
import PropTypes from 'prop-types';
import Moment from 'react-moment';

const ProfileEducation = ({education: {school, degree, from, to}}) => {
  return (
    <li>
       <strong>{school}</strong> in <strong>{degree}</strong> from {<Moment format='MM/YY'>{from}</Moment>} to {to === null ?'Now' : <Moment format='MM/YY'>{to}</Moment>}
    </li>
  )
}

ProfileEducation.propTypes = {

}

export default ProfileEducation
