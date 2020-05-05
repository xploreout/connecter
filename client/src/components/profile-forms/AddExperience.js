import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { addExperience } from '../../actions/profile';

const AddExperience = ({history, addExperience }) =>  {

  const [ formData, setFormData ] = useState({
    title : "",
    company : "",
    location : "",
    from : "",
    to : "",
    current: false,
    description : ""
  });

  const {
    title,
    company,
    location,
    from,
    to,
    current,
    description
  } = formData;

  const onChangeHandler = e => {
    setFormData( {...formData, [e.target.name]: e.target.value});
   }

   const onSubmitHandler = e => {
     e.preventDefault();
     console.log('onsubmithandler////', JSON.stringify(formData))
     addExperience(formData, history);
   }
  return (
    <Fragment>
      <h1 className="large text-primary">
        Add An Experience
      </h1>
      <p className="lead">
        <i className="fas fa-code-branch"></i> Add any developer/programming
        positions that you have had in the past
      </p>
      <small>* = required field</small>
      <form className="form" onSubmit={(e)=>onSubmitHandler(e)} >
        <div className="form-group">
          <input type="text" placeholder="* Job Title" name="title" required value={title} onChange={(e)=>onChangeHandler(e)} />
        </div>
        <div className="form-group">
          <input type="text" placeholder="* Company" name="company" required value={company} onChange={(e)=>onChangeHandler(e)} />
        </div>
        <div className="form-group">
          <input type="text" placeholder="Location" name="location" required value={location} onChange={(e)=>onChangeHandler(e)}  />
        </div>
        <div className="form-group">
          <h4>From Date</h4>
          <input type="date" name="from" required value={from} onChange={(e)=>onChangeHandler(e)}  />
        </div>
        <div className="form-group">
          <h4>To Date</h4>
          <input type="date" name="to" required value={to} onChange={e=>onChangeHandler(e)}  />
        </div>
        <div className="form-group">
          <p><input type="checkbox" name="current" value={current} onChange={e=>{setFormData({...formData, current: !current})}} /> Current Job</p>
        </div>
        <div className="form-group">
          <textarea
            name="description"
            cols="30"
            rows="5"
            value={description}
            placeholder="Job Description"
            onChange={(e)=>onChangeHandler(e)}
          ></textarea>
        </div>
        <input type="submit" className="btn btn-primary my-1" />
        <Link className="btn my-1" to="/dashboard">Go Back</Link>
      </form>
    </Fragment>
  )
}

AddExperience.propTypes = {
  addExperience: PropTypes.func.isRequired
}

export default connect(null, {addExperience})(withRouter(AddExperience));

