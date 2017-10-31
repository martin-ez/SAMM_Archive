import React, {Component} from 'react';
import PropTypes from 'prop-types';

import {Meteor} from 'meteor/meteor';
import {Session} from 'meteor/session';
import {createContainer} from 'meteor/react-meteor-data';
import {SessionDB} from '../api/SessionSongs.js';
import {SavedDB} from '../api/SavedSongs.js';
import {StatsDB} from '../api/UserStats.js';
import firebase, { auth, provider } from '../auth/firebase.js';

import Home from './Home.jsx';
import Room from './Room.jsx';

// App component - represents the whole app
class App extends Component {
  constructor(props) {
    super(props);
    this.Login = this.Login.bind(this);
    this.Logout = this.Logout.bind(this);
    this.UserLeaving = this.UserLeaving.bind(this);
    window.addEventListener('beforeunload', this.UserLeaving);
    this.state = {
      view: "home",
      sessionSong: null,
      list: [],
      user: null,
      userStats: null,
      instrumentPlayed: null
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      sessionSong: nextProps.currentSong,
      list: nextProps.songs
    });
  }

  componentDidMount() {
    auth.onAuthStateChanged((user) => {
      if (user) {
        //this.InitUser(user);
        this.setState({user:user});
      }
    });
  }

  InitUser(user) {
    if(user!== null && user!== undefined) {
      let email = user.email;
      let savedStats = StatsDB.findOne({email:email});
      if(savedStats === undefined) {
        let noSession = 0;
        let noSaved = 0;
        let favInstr = '-';
        Meteor.call('userStats.addUser',{
          email,
          noSession,
          noSaved,
          favInstr
        }, (error, response) => {
          if (error) {
            console.log(error);
          } else {
            console.log('UserStats added');
            let u = StatsDB.findOne({_id:response});
            this.setState({
              user: user,
              userStats: u
            });
          }
        });
      } else {
        this.setState({
          user: user,
          userStats: savedStats
        });
      }
    }
  }

  render() {
    return (
      <div className="app">
        {this.RenderPage()}
      </div>
    );
  }

  RenderPage() {
    if (this.state.view === 'home') {
      return (
        <Home
          updateView={(v) => this.UpdateView(v)}
          login={() => this.Log()}
          user={this.state.user}
          stats={this.state.userStats} />
      );
    }
    if (this.state.view === 'room') {
      return (
        <Room
        session={true}
        song={this.state.sessionSong.song}
        user={this.state.user?this.state.user.displayName.split(" ")[0]:"Guest"}
        update={(s) => this.UpdateSessionSong(s)}
        saveSong={() => this.SaveSong()}
        instrument={(instr) => this.SetInstrument(instr)}/>
      );
    }
  }

  UpdateView(newView) {
    if(newView==='room' && this.state.sessionSong===null) {
      var end = false;
      if (this.state.list !== 0) {
        for (var i = 0; i < this.state.list.length && !end; i++) {
          if (this.state.list[i].noUsers < 3) {
            var id = this.state.list[i]._id;
            Meteor.call('session.addUser',{
              id
            }, (error, response) =>{
              if (error) {
                console.log(error);
              } else {
                console.log('SessionSong updated');
                Session.set('currentSong', id);
                var s = SessionDB.findOne(id);
                this.setState({
                  sessionSong: s,
                  view: newView
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
            this.setState({
              sessionSong: s,
              view: newView
            });
          }
        });
      }
    } else {
      this.setState({view: newView});
    }
  }

  SetInstrument(instr) {
    this.setState({
      instrumentPlayed: instr
    });
  }

  UpdateSessionSong(song) {
    var id = this.state.sessionSong._id;
    Meteor.call('session.updateSong', {
      id,
      song
    }, (error, response) => {
      if (error) {
        console.log(error);
      } else {
        console.log('SessionSong updated');
        var s = SessionDB.findOne(id);
        this.setState({
          song: s
        });
      }
    });
  }

  SaveSong() {
    var song = this.state.sessionSong.song;
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

  Log() {
    if(this.state.user) {
      this.Logout();
    } else {
      this.Login();
    }
  }

  Login() {
  auth.signInWithPopup(provider)
    .then((result) => {
      const user = result.user;
      //this.InitUser(user);
      this.setState({user:user});
    });
  }

  Logout() {
    auth.signOut()
    .then(() => {
      this.setState({
        user: null,
        userStats: null
      });
    });
  }

  UserLeaving() {
    if(this.state.sessionSong !== null) {
      var id = this.state.sessionSong._id;
      var instrument = this.state.instrumentPlayed;
      Meteor.call('session.deleteUser', {
        id,
        instrument
      }, (error, response) => {
        if (error) {
          console.log(error);
        } else {
          console.log('User remove from session');
        }
      });
    }      
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
    var songsInSession = SessionDB.find({}).fetch();
    return {
      currentSong: null,
      songs: songsInSession
    };
  } else {
    var s = SessionDB.findOne(current);
    return {
      currentSong: s,
      songs: null
    };
  }
}, App);
