import React, {Component} from 'react';
import PropTypes from 'prop-types';

import {Meteor} from 'meteor/meteor';
import {Session} from 'meteor/session';
import {createContainer} from 'meteor/react-meteor-data';
import {SessionDB} from '../api/SessionSongs.js';
import {SavedDB} from '../api/SavedSongs.js';

import Home from './Home.jsx';
import Login from './Login.jsx';
import Room from './Room.jsx';

// App component - represents the whole app
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      view: "home"
    }
  }

  render() {
    if (this.state.view === 'home') {
      return (
        <Home updateView={(v) => this.UpdateView(v)}/>
      );
    }
    if (this.state.view === 'login') {
      return (
        <Login updateView={(v) => this.UpdateView(v)}/>
      );
    }
    if (this.state.view === 'room') {
      return (
        <Room session={true}
        song={this.props.currentSong.song}
        user={this.props.currentUser !== null ? this.props.currentUser.username : "Guest"}
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
}

App.propTypes = {
  songs: PropTypes.array,
  currentUser: PropTypes.object
};

export default createContainer(() => {
  Meteor.subscribe('session');
  var current = Session.get('currentSong');
  if (current === undefined || current === null) {
    return {
      currentSong: null,
      songs: SessionDB.find({}).fetch(),
      currentUser: (Meteor.user())
        ? Meteor.user()
        : {}
    };
  } else {
    var s = SessionDB.findOne(current);
    return {
      currentSong: s,
      songs: null,
      currentUser: (Meteor.user())
        ? Meteor.user()
        : {}
    };
  }
}, App);
