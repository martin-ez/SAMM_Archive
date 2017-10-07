import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {createContainer} from 'meteor/react-meteor-data';
import Slider from './Slider.jsx';
import {Songs} from '../api/songs.js';
import Song from './Song.jsx';
import MainPage from './MainPage.jsx';
import SelectionView from './SelectionView.jsx';
import './css/App.css';
import './css/SelectionView.css';


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

    handleSubmit(event) {
        event.preventDefault();

        // Find the text field via the React ref
        const text = ReactDOM.findDOMNode(this.refs.textInput).value.trim();

        Song.insert({
            text,
            createdAt: new Date(), // current time
            owner: Meteor.userId(),           // _id of logged in user
            username: Meteor.user().username,  // username of logged in user
        });

        // Clear form
        ReactDOM.findDOMNode(this.refs.textInput).value = '';
    }

    toggleHideCompleted() {
        this.setState({
            hideCompleted: !this.state.hideCompleted,
        });
    }
    renderView(){

        if (this.state.vista==='login'){

            return <MainPage updateV={(v)=>this.UpdateView(v)}/>
        }
        if(this.state.vista==='selectionView'){
            return<SelectionView updateV={(v)=>this.UpdateView(v)}/>
        }
        if(this.state.vista==='room'){

            return <Room song={this.state.song} update={(s) => this.UpdateSong(s)} updateV={(v)=>this.UpdateView(v)}/>
        }
    }


    render() {
        return (

            <div className="container">
                {this.renderView()}
                {console.log(this.state.vista)}
            </div>
        );
    }

    UpdateSong(s) {
        this.setState({
            song: s
        });
    }
    UpdateView(view){

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
