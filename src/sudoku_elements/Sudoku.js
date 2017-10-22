import React, { Component } from 'react';
import Row from './Row';
import { Table, Button } from 'semantic-ui-react';
import Generator from '../sudoku_engine/Generator';
import Controller from '../sudoku_engine/Controller';

class Sudoku extends Component {
  constructor(props) {
    super(props);

    this.handleRowClick = this.handleRowClick.bind(this);
    this.generatorInstance = new Generator();
    this.state = { valuesList: this.generatorInstance.buildResponseArray(), key: Array(9).fill('').map((n, i) => i) };
  }

  componentDidMount() {

  }

  componentWillUnmount() {
    console.log("Sudoku has been unmounted");
  }

  handleRowClick(rowIndex, cellIndex, cellValue) {
    const list = this.state.valuesList.slice();
    list[rowIndex - 1][cellIndex - 1] = cellValue;

    this.setState({
      valuesList: list
    });
  }

  difficultyDispatcher(difficulty) {
    switch (difficulty) {
      case 'Easy': 
        return 20;
      case 'Medium':
        return 40;
      case 'Hard':
        return 60;
      default:
        return 20;
    }
  }

  call() {
    let result = this.generatorInstance.generateVrp(this.difficultyDispatcher(this.props.difficulty));

    this.setState({
      valuesList: result,
      key: this.state.key.map((n, i) => result[i].join(''))
    })
  }

  render() {

    return (
      <div>
        <Button icon={'puzzle'} color={'linkedin'} label={'Generate'} onClick={() => { this.call() }} />
        <Table celled>
          <Table.Body>
            <Row rowIndex={1} key={this.state.key[0]} upIndexValue={this.handleRowClick} list={this.state.valuesList[0]} />
            <Row rowIndex={2} key={this.state.key[1]} upIndexValue={this.handleRowClick} list={this.state.valuesList[1]} />
            <Row rowIndex={3} key={this.state.key[2]} upIndexValue={this.handleRowClick} list={this.state.valuesList[2]} />
            <Row rowIndex={4} key={this.state.key[3]} upIndexValue={this.handleRowClick} list={this.state.valuesList[3]} />
            <Row rowIndex={5} key={this.state.key[4]} upIndexValue={this.handleRowClick} list={this.state.valuesList[4]} />
            <Row rowIndex={6} key={this.state.key[5]} upIndexValue={this.handleRowClick} list={this.state.valuesList[5]} />
            <Row rowIndex={7} key={this.state.key[6]} upIndexValue={this.handleRowClick} list={this.state.valuesList[6]} />
            <Row rowIndex={8} key={this.state.key[7]} upIndexValue={this.handleRowClick} list={this.state.valuesList[7]} />
            <Row rowIndex={9} key={this.state.key[8]} upIndexValue={this.handleRowClick} list={this.state.valuesList[8]} />
          </Table.Body>
        </Table>
      </div>
    );
  }
}

export default Sudoku;
