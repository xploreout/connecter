//racfp p is proptype es7 snippeet extension
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux'; //anytime interact w redux whether calling an action or getting a state, need connect


//instead of props to get props.alerts..just destructure {alerts}
const Alert = ({ alerts }) => alerts !== null && alerts.length > 0 && alerts.map(alert => (
  <div key={alert.msg.id} className={`alert alert-${alert.msg.alertType}`}>
    { alert.msg.msg }
  </div>
))

Alert.propTypes = {
  alerts: PropTypes.array.isRequired,  //ptar
};

//want to get the alert state
//mapping a redux state to props so can access to it
const mapStateToProps = state => ({
  alerts: state.alert //'state.alert' is from root reducer reducer/index define as 'alert'
  //whatever props you want to call it..so call it 'alerts'
  //so props.alerts is avail
});

export default connect(mapStateToProps)(Alert); //export component Alert
