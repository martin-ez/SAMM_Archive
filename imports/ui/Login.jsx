import React, {Component} from 'react';
import PropTypes from 'prop-types';

class Login extends Component {
  render() {
    return (
      <div className="empty"></div>
    );
  }
}

Login.propTypes = {
  updateView: PropTypes.func.isRequired
}

export default Login;
