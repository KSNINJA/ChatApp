import React, { Component } from 'react';
import '../Styles/App.css';
import {AuthController} from './AuthController.js';

class App extends Component {
  render() {
    return (
      <div className="App">
        <AuthController/>
      </div>
    );
  }
}

export default App;
