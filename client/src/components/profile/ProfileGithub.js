import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getGithubRepos } from '../../actions/profile';

const ProfileGithub = ({ username, repos, getGithubRepos }) => {
  useEffect(() => {
    getGithubRepos(username);
  }, [getGithubRepos]);

  return (
    <div className='profile-github'>
      {repos !== null
        ? repos.map((repo) => (
            <div key={repo.id} className='repo bg-white p-1 m-1'>
              <div>
                <h4>
                  <a
                    href={repo.html_url}
                    target='_blank'
                    rel='noopener noreferer'
                  >
                    {repo.name}
                  </a>
                  <p>{repo.description}</p>
                </h4>
              </div>
              <ul>
                <li className='badge badge-primary'>
                  Stars: {repo.startglazers_count}
                </li>
                <li className='badge badge-light'>Fork: {repo.forks_count}</li>
                <li className='badge badge-dark'>
                  Watchers: {repo.watchers_count}
                </li>
              </ul>
            </div>
          ))
        : 'No repo available'}
    </div>
  );
};

ProfileGithub.propTypes = {
  getGithubRepos: PropTypes.func.isRequired,
  repos: PropTypes.array.isRequired,
  username: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  repos: state.profile.repos,
});
export default connect(mapStateToProps, { getGithubRepos })(ProfileGithub);
