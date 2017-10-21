import React, {Component} from 'react';

class HomeInfo extends Component {
  render() {
    return (
      <div id="HomeInfo" className="infoPage">
        <span>
          <h1>Social Adaptable Music Maker</h1>
          <br/>
          <h2>What is SAMM?</h2>
          <br/>
          <p>
            It's a place where you can create music with total strangers. You
            don't need to know any music theory, just have fun jamming out.
          </p>
          <br/>
          <h2>How can I use it?</h2>
          <br/>
          <p>
            Click the "Make Music" button to start creating. You can also log in
            to be able to save songs.
          </p>
        </span>
      </div>
    );
  }
}

export default HomeInfo;
