import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {createContainer} from 'meteor/react-meteor-data';
import Slider from './Slider.jsx'
import Room from './Room.jsx';

// App component - represents the whole app
class App extends Component {
  constructor(props) {
    super(props);
    import SongGenerator from '../core/SongGenerator.js';
    var songGenerator = new SongGenerator();
    this.state = {
      song: songGenerator.CreateNewSong()
    }
  }

  render() {
    return (
      <div className="container">
        <Room song={this.state.song} update={(s) => this.UpdateSong(s)}/>
      </div>
    );
  }

  UpdateSong(s) {
    this.setState({
      song: s
    });
  }
}

App.propTypes = {};

export default createContainer(() => {
  return {/*Props*/
  };
}, App);
