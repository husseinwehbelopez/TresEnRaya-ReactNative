/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { AppRegistry } from 'react-native';
import App from './src/js/App';
var TresEnRaya = React.createClass({
render: function() {
return (
<App />
);
}
});
AppRegistry.registerComponent('TresEnRaya', () => TresEnRaya);
