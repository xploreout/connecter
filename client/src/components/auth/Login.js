import React, { Fragment, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { login } from '../../actions/auth';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const Login = ({ login, isAuthenticated}) => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const { email, password } = formData;

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
      console.log('Login success');
    login(email, password);
  };

  if (isAuthenticated) {
    return <Redirect to='/dashboard' />
  }
  
  return (
    <Fragment>
      <h1 className='large text-primary'>Login</h1>
      <form className='form' onSubmit={e => handleSubmit(e)}>
        <div className='form-group'>
          <input
            type='email'
            placeholder='Email Address'
            value={email}
            name='email'
            onChange={e => onChange(e)}
            required
          />
          <small className='form-text'>
            This site uses Gravatar, so if you want a profile image, use a
            Gravatar email
          </small>
        </div>
        <div className='form-group'>
          <input
            type='password'
            placeholder='Password'
            name='password'
            minLength='6'
            value={password}
            onChange={e => onChange(e)}
            required
          />
        </div>
        <input type='submit' value='Login' className='btn btn-primary' />
      </form>
      <p className='my-1'>
        Don't have an account? <Link to='/register'>Sign Up</Link>
      </p>
    </Fragment>
  );
};

Login.propTypes = {
  login: PropTypes.func.isRequired,
  setAlert: PropTypes.func, //ptfr es7 snippeet extension
  isAuthenticated: PropTypes.bool
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps, { login })(Login);

