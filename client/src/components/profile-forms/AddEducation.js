import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { addEducation } from '../../actions/profile';

const AddEducation = ({history, addEducation }) =>  {

  const [ formData, setFormData ] = useState({
    school : "",
    degree : "",
    fieldofstudy : "",
    from : "",
    to : "",
    current: false,
    description : ""
  });

  const {
    school,
    degree,
    fieldofstudy,
    from,
    to,
    current,
    description
  } = formData;

  const [toDateDisabled, toggleDisabled] = useState(false);

  const onChangeHandler = e => {
    setFormData( {...formData, [e.target.name]: e.target.value});
   }

   const onSubmitHandler = e => {
     e.preventDefault();
     addEducation(formData, history);
   }
  return (
    <Fragment>
      <h1 className="large text-primary">
        Add Education
      </h1>
      <p className="lead">
        <i className="fas fa-code-branch"></i> Add your schooling and education
      </p>
      <small>* = required field</small>
      <form className="form" onSubmit={(e)=>onSubmitHandler(e)} >
        <div className="form-group">
          <input type="text" placeholder="school" name="school" required value={school} onChange={(e)=>onChangeHandler(e)} />
        </div>
        <div className="form-group">
          <input type="text" placeholder="degree" name="degree" required value={degree} onChange={(e)=>onChangeHandler(e)} />
        </div>
        <div className="form-group">
          <input type="text" placeholder="fieldofstudy" name="fieldofstudy" required value={fieldofstudy} onChange={(e)=>onChangeHandler(e)}  />
        </div>
        <div className="form-group">
          <h4>From Date</h4>
          <input type="date" name="from" required value={from} onChange={(e)=>onChangeHandler(e)}  />
        </div>
        <div className="form-group">
          <h4>To Date</h4>
          <input type="date" name="to" value={to}  onChange={e => onChangeHandler(e)}
            disabled={toDateDisabled ? 'disabled' : ''}  />
        </div>
        <div className="form-group">
          <p> <input
              type='checkbox'
              name='current'
              checked={current}
              value={current}
              onChange={e => {
                setFormData({ ...formData, current: !current });
                toggleDisabled(!toDateDisabled);
              }}
            />{' '} 
            Currently Attending</p>
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

AddEducation.propTypes = {
  addEducation: PropTypes.func.isRequired
}

export default connect(null, {addEducation})(withRouter(AddEducation));


