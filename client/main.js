import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import '../imports/StartUp/accounts-config.js';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import App from '../imports/ui/App.jsx';

Meteor.startup(() => {
    $.getScript("https://code.jquery.com/jquery-3.2.1.min.js", function () {});
    $.getScript("../../login.js", function () {});
    render(<MuiThemeProvider><App /></MuiThemeProvider>, document.getElementById('root'));
});
