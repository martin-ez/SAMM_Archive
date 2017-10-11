import React, {Component} from 'react';
import PropTypes from 'prop-types';

import {Meteor} from 'meteor/meteor';
import {createContainer} from 'meteor/react-meteor-data';
import {SessionDB, SavedDB} from '../api/songs.js';

import MainPage from './MainPage.jsx';
import SelectionView from './SelectionView.jsx';

import './css/SelectionView.css';
import './css/App.css';

import Room from './Room.jsx';

// App component - represents the whole app
class App extends Component {
  constructor(props) {
    super(props);
    var sessionSong = null;
    var end = false;
    if (props.songs.length !== 0) {
      for (var i = 0; i < props.songs.length && !end; i++) {
        if (props.songs[i].song.drums.user === "" || props.songs[i].song.bass.user === "") {
          sessionSong = props.songs[i].song;
          end = true;
        }
      }
    }
    if (!end) {
      import SongGenerator from '../core/SongGenerator.js';
      var songGenerator = new SongGenerator();
      sessionSong = songGenerator.CreateNewSong();
    }

    this.state = {
      song: sessionSong,
      vista: "login"
    }
  }

  componentWillMount() {
    if(this.props.currentUser !== null && this.state.song!==null) {
      this.saveSessionSong();
    }
  }

  saveSongsDBsaved() {
    var user = this.props.currentUser!==null?this.props.currentUser.username:"Guest";
    const _id = SavedDB.insert({
      song: this.state.song, createdAt: new Date(), // current time
      owner: Meteor.userId(), // _id of logged in user
      username: user // username of logged in user
    });
    let newSong = {
      ...this.state.song
    };
    newSong._id = _id;
    this.setState({song: newSong})
  }

  saveSessionSong() {
    var user = this.props.currentUser;
    if (this.state.song._id) {
      SessionDB.update(this.state.song._id, {
        $set: {
          song: this.state.song
        }
      });
    } else {
      const _id = SessionDB.insert({
        song: this.state.song, createdAt: new Date(), // current time
        owner: Meteor.userId(), // _id of logged in user
        username: user, // username of logged in user
      });
      let newSong = {
        ...this.state.song
      };
      newSong._id = _id;
      this.setState({song: newSong})
    }
  }

  render() {
    return (
      <div className="container">
        {this.renderView()}
      </div>
    );
  }

  renderView() {

    if (this.state.vista === 'login') {

      return <MainPage updateV={(v) => this.UpdateView(v)}/>
    }
    if (this.state.vista === 'selectionView') {
      return <SelectionView updateV={(v) => this.UpdateView(v)}/>
    }
    if (this.state.vista === 'room') {

      return <Room song={this.state.song} user={this.props.currentUser!==null?this.props.currentUser.username:"Guest"} update={(s) => this.UpdateSong(s)} updateV={(v) => this.UpdateView(v)} usuario={this.props.currentUser} saveS={() => this.saveSongsDBsaved()}/>
    }
  }

  UpdateSong(s) {
    this.setState({song: s}, () => {
      if(this.props.currentUser !== null && this.state.song!==null) {
        this.saveSessionSong();
      }
    });
  }

  UpdateView(view) {
    this.setState({vista: view})
  }
}

App.propTypes = {
  songs: PropTypes.array.isRequired,
  currentUser: PropTypes.object
};

export default createContainer(() => {
  return {
    songs: SessionDB.find({}, {sort: {createdAt: -1}}).fetch(),
    currentUser: Meteor.user()
  };
}, App);
