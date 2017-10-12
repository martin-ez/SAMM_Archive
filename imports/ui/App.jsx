import React, {Component} from 'react';
import PropTypes from 'prop-types';

import {Meteor} from 'meteor/meteor';
import { Session } from 'meteor/session';
import {createContainer} from 'meteor/react-meteor-data';
import {SessionDB} from '../api/SessionSongs.js';
import {SavedDB} from '../api/SavedSongs.js';

import MainPage from './MainPage.jsx';
import SelectionView from './SelectionView.jsx';

import './css/SelectionView.css';
import './css/App.css';

import Room from './Room.jsx';

// App component - represents the whole app
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      vista: "login"
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
      return <Room song={this.props.currentSong.song} user={this.props.currentUser!==null?this.props.currentUser.username:"Guest"} update={(s) => this.UpdateSong(s)} updateV={(v) => this.UpdateView(v)} saveS={() => this.saveSongsDBsaved()}/>
    }
  }

  UpdateSong(song) {
    var id = this.props.currentSong._id;
    Meteor.call('session.updateSong',{
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

  saveSongsDBsaved() {
    var song = this.props.currentSong.song;
    var owner = Meteor.userId();
    Meteor.call('saved.addSong',{
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

  UpdateView(view) {
    if(view==='selectionView') {
      var end = false;
      if (this.props.songs.length !== 0) {
        for (var i = 0; i < this.props.songs.length && !end; i++) {
          if (this.props.songs[i].noUsers < 2) {
            var id = this.props.songs[i]._id;
            Meteor.call('session.addUser',{
              id
            }, (error, response) =>{
              if (error) {
                console.log(error);
              } else {
                console.log('SessionSong updated');
                Session.set('currentSong', id);
                var s = SessionDB.findOne(id);
                this.props.currentSong = s;
                this.setState({
                  vista: view
                });
              }
            });
            end = true;
          }
        }
      }
      if (!end) {
        import SongGenerator from '../core/SongGenerator.js';
        var songGenerator = new SongGenerator();
        var song = songGenerator.CreateNewSong();
        var noUsers = 1;
        Meteor.call('session.addSong',{
          song,
          noUsers
        }, (error, response) => {
          if (error) {
            console.log(error);
          } else {
            console.log('SessionSong added');
            Session.set('currentSong', response);
            var s = SessionDB.findOne(response);
            this.props.currentSong = s;
            this.setState({
              vista: view
            });
          }
        });
      }
    } else {
      this.setState({vista: view});
    }
  }
}

App.propTypes = {
  songs: PropTypes.array,
  currentUser: PropTypes.object
};

export default createContainer(() => {
  Meteor.subscribe('session');
  var current = Session.get('currentSong');
  if(current===undefined || current===null) {
    return {
      currentSong: null,
      songs: SessionDB.find({}).fetch(),
      currentUser: (Meteor.user())?Meteor.user():{}
    };
  } else {
    var s = SessionDB.findOne(current);
    return {
      currentSong: s,
      songs: null,
      currentUser: (Meteor.user())?Meteor.user():{}
    };
  }
}, App);
