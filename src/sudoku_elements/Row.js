import React, { Component } from 'react'
import { Table } from 'semantic-ui-react';
import Cell from './Cell';

class Row extends Component {
    constructor(props) {
        super(props);

        this.handleCellClick = this.handleCellClick.bind(this);
    }

    handleCellClick(cellIndex, cellValue) {
        this.props.upIndexValue(this.props.rowIndex, cellIndex, cellValue);
    }

    render() {
        if (this.props.list != null) {
            return (
                <Table.Row>
                    <Cell cellIndex={1} rowIndex={this.props.rowIndex} value={this.props.list[0]} cellClickListener={this.handleCellClick} editable={this.props.freez[0]} />
                    <Cell cellIndex={2} rowIndex={this.props.rowIndex} value={this.props.list[1]} cellClickListener={this.handleCellClick} editable={this.props.freez[1]} />
                    <Cell cellIndex={3} rowIndex={this.props.rowIndex} value={this.props.list[2]} cellClickListener={this.handleCellClick} editable={this.props.freez[2]} />
                    <Cell cellIndex={4} rowIndex={this.props.rowIndex} value={this.props.list[3]} cellClickListener={this.handleCellClick} editable={this.props.freez[3]} />
                    <Cell cellIndex={5} rowIndex={this.props.rowIndex} value={this.props.list[4]} cellClickListener={this.handleCellClick} editable={this.props.freez[4]} />
                    <Cell cellIndex={6} rowIndex={this.props.rowIndex} value={this.props.list[5]} cellClickListener={this.handleCellClick} editable={this.props.freez[5]} />
                    <Cell cellIndex={7} rowIndex={this.props.rowIndex} value={this.props.list[6]} cellClickListener={this.handleCellClick} editable={this.props.freez[6]} />
                    <Cell cellIndex={8} rowIndex={this.props.rowIndex} value={this.props.list[7]} cellClickListener={this.handleCellClick} editable={this.props.freez[7]} />
                    <Cell cellIndex={9} rowIndex={this.props.rowIndex} value={this.props.list[8]} cellClickListener={this.handleCellClick} editable={this.props.freez[8]} />
                </Table.Row>
            );
        } else {
            return (
                <Table.Row />
            );
        }

    }
}

export default Row;