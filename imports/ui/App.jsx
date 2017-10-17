import React, {Component} from 'react';
import PropTypes from 'prop-types';

import firebase, { auth, provider } from '../auth/firebase.js';
import {Meteor} from 'meteor/meteor';
import {Session} from 'meteor/session';
import {createContainer} from 'meteor/react-meteor-data';
import {SessionDB} from '../api/SessionSongs.js';
import {SavedDB} from '../api/SavedSongs.js';

import NavBar from './NavBar.jsx';
import Home from './Home.jsx';
import Room from './Room.jsx';

// App component - represents the whole app
class App extends Component {
  constructor(props) {
    super(props);
    this.Login = this.Login.bind(this);
    this.Logout = this.Logout.bind(this);
    this.state = {
      view: "home",
      user: null
    }
  }

  render() {
    return (
      <div className="app">
        {this.RenderNavBar()}
        {this.RenderPage()}
      </div>
    );
  }

  RenderNavBar() {
    if(this.state.view === 'home') {
      return (
        <NavBar user={this.state.user} logout={this.Logout} />
      );
    }
  }

  RenderPage() {
    if (this.state.view === 'home') {
      return (
        <Home updateView={(v) => this.UpdateView(v)} login={this.Login} user={this.state.user}/>
      );
    }
    if (this.state.view === 'room') {
      return (
        <Room session={true}
        song={this.props.currentSong.song}
        user={this.state.user}
        update={(s) => this.UpdateSessionSong(s)}
        saveSong={() => this.SaveSong()}/>
      );
    }
  }

  UpdateView(newView) {
    this.setState({view: newView});
  }

  UpdateSessionSong(song) {
    var id = this.props.currentSong._id;
    Meteor.call('session.updateSong', {
      id,
      song
    }, (error, response) => {
      if (error) {
        console.log(error);
      } else {
        console.log('SessionSong updated');
        var s = SessionDB.findOne(id);
        this.props.currentSong = s;
      }
    });
  }

  SaveSong() {
    var song = this.props.currentSong.song;
    var owner = Meteor.userId();
    Meteor.call('saved.addSong', {
      song,
      owner
    }, (err, res) => {
      if (err) {
        console.log(err);
      } else {
        console.log('SavedSong added');
      }
    });
  }

  Login() {
  auth.signInWithPopup(provider)
    .then((result) => {
      const user = result.user;
      this.setState({
        user: user
      });
    });
  }

  Logout() {

  }
}

App.propTypes = {
  currentSong: PropTypes.object,
  songs: PropTypes.array
};

export default createContainer(() => {
  Meteor.subscribe('session');
  var current = Session.get('currentSong');
  if (current === undefined || current === null) {
    return {
      currentSong: null,
      songs: SessionDB.find({}).fetch()
    };
  } else {
    var s = SessionDB.findOne(current);
    return {
      currentSong: s,
      songs: null
    };
  }
}, App);
