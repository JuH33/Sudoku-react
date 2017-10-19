import React, { Component } from 'react';
import Row from './Row';
import { Table } from 'semantic-ui-react';

class Sudoku extends Component {
  constructor(props) {
    super(props);

    this.handleRowClick = this.handleRowClick.bind(this);
    this.state = { valuesList: this.buildResponseArray() };
  }

  buildResponseArray() {
    let valuesList;

    try {
      valuesList = Array(9);

      for (var i = 0; i < 9; i++)
        valuesList[i] = Array(9).fill(i);
    } catch (e) {
      console.error(e);
    }

    return valuesList;
  }

  componentDidMount() {

  }
    
  componentWillUnmount() {
    console.log("Sudoku has been unmounted");
  }

  /******
   * Events
   */

   handleRowClick(rowIndex, cellIndex, cellValue) {
    const list = this.state.valuesList.slice();
    list[rowIndex-1][cellIndex-1] = cellValue;

    this.setState({
      valuesList: list
    });
   }

  render() {

    return (
        <Table celled>
          <Table.Body>  
            <Row rowIndex={1} upIndexValue={this.handleRowClick} list={this.state.valuesList[0]} />
            <Row rowIndex={2} upIndexValue={this.handleRowClick} list={this.state.valuesList[1]} />
            <Row rowIndex={3} upIndexValue={this.handleRowClick} list={this.state.valuesList[2]} />
            <Row rowIndex={4} upIndexValue={this.handleRowClick} list={this.state.valuesList[3]} />
            <Row rowIndex={5} upIndexValue={this.handleRowClick} list={this.state.valuesList[4]} />
            <Row rowIndex={6} upIndexValue={this.handleRowClick} list={this.state.valuesList[5]} />
            <Row rowIndex={7} upIndexValue={this.handleRowClick} list={this.state.valuesList[6]} />
            <Row rowIndex={8} upIndexValue={this.handleRowClick} list={this.state.valuesList[7]} />
            <Row rowIndex={9} upIndexValue={this.handleRowClick} list={this.state.valuesList[8]} />
          </Table.Body>
        </Table>
    );
  }
}

export default Sudoku;
