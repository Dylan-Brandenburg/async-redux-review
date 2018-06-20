import React, { Component } from 'react';
import { Provider } from 'react-redux';

import store from './store';
import Films from './components/Films';
import People from './components/People';
import './App.css';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div className="App">
          <Films />
          <People />
        </div>
      </Provider>
    );
  }
}

export default App;
