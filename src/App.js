import React, { Component } from 'react';
import Sudoku from './sudoku_elements/Sudoku';
import styles from './css/App.css';

class App extends Component {
  render() {
    return (
      <div className="app">
        <Sudoku />
      </div>
    );
  }
}

export default App;
