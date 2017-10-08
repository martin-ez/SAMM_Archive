import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {createContainer} from 'meteor/react-meteor-data';
import {SongsDBsesion, SongsDBsaved} from '../api/Songs.js';

import MainPage from './MainPage.jsx';
import SelectionView from './SelectionView.jsx';

import './css/SelectionView.css';
import './css/App.css';


import Room from './Room.jsx';

// App component - represents the whole app
class App extends Component {
    constructor(props) {
        super(props);
        import SongGenerator from '../core/SongGenerator.js';
        var songGenerator = new SongGenerator();
        this.state = {
            song: songGenerator.CreateNewSong(),
            vista: "login"
        }
    }

    saveSongsDBsaved() {

        const _id = SongsDBsaved.insert({
            song: this.state.song,
            createdAt: new Date(), // current time
            owner: Meteor.userId(),           // _id of logged in user
            username: Meteor.user().username,  // username of logged in user
        });
        let newSong = {...this.state.song};
        newSong._id = _id;
        this.setState({song: newSong})
    }

    saveSongsDBsesion() {

        if (this.state.song._id) {
            SongsDBsesion.update(this.state.song._id, {
                $set: {song: this.state.song},
            });
        }
        else {
            const _id = SongsDBsesion.insert({
                song: this.state.song,
                createdAt: new Date(), // current time
                owner: Meteor.userId(),           // _id of logged in user
                username: Meteor.user().username,  // username of logged in user
            });
            let newSong = {...this.state.song};
            newSong._id = _id;
            this.setState({song: newSong})
        }
    }
    renderView() {

        if (this.state.vista === 'login') {

            return <MainPage updateV={(v) => this.UpdateView(v)}/>
        }
        if (this.state.vista === 'selectionView') {
            return <SelectionView updateV={(v) => this.UpdateView(v)}/>
        }
        if (this.state.vista === 'room') {

            return <Room song={this.state.song} update={(s) => this.UpdateSong(s)} updateV={(v) => this.UpdateView(v)}
                         usuario={this.props.currentUser}
                         saveS={() => {
                             this.saveSongsDBsaved()
                         }}/>
        }
    }


    render() {

        return (

            <div className="container">
                {this.renderView()}

            </div>
        );
    }

    UpdateSong(s) {
        this.setState({
            song: s
        });
        this.saveSongsDBsesion();
    }

    UpdateView(view) {

        this.setState({vista: view})
    }
}

App.propTypes = {
    currentUser: PropTypes.object,
    // songs: PropTypes.array.isRequired
};

export default createContainer(() => {
    return {
        // songs: Songs.find({}, {sort: {createdAt: -1}}).fetch(),
        // incompleteCount: Songs.find({checked: {$ne: true}}).count(),
        currentUser: Meteor.user(),
    };
}, App);
