import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import App from '../imports/ui/App.jsx';

Meteor.startup(() => {
    render(<MuiThemeProvider><App /></MuiThemeProvider>, document.getElementById('root'));
});
