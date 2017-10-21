import React, {Component} from 'react';
import PropTypes from 'prop-types';

import './css/UserInfoStyle.css';

class UserInfo extends Component {
  render() {
    return (
      <div id="UserInfo" className="infoPage">
        <div className="userImg">
          <img src={this.props.user.photoURL} alt={this.props.user.displayName+"'s profile image"}/>
        </div>
        <h1>{this.props.user.displayName}</h1>
        <div className="userStats">
          <div className="sessionSong">
            <h2>SessionSongs</h2>
            <p>0</p>
          </div>
          <div className="savedSong">
            <h2>SavedSongs</h2>
            <p>0</p>
          </div>
          <div className="favInstr">
            <h2>FavoriteInstr</h2>
            <p>Bass</p>
          </div>
        </div>
        <div className="loadSong">
          <button>
            <h2>Load saved song</h2>
          </button>
        </div>
      </div>
    );
  }
}

UserInfo.propTypes = {
  user: PropTypes.object.isRequired,
  stats: PropTypes.object
}

export default UserInfo;
