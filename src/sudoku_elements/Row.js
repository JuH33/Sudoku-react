import React, {Component} from 'react'
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
                <Table.Row >
                    <Cell cellIndex={1} value={this.props.list[0]} cellClickListener={this.handleCellClick} />
                    <Cell cellIndex={2} value={this.props.list[1]} cellClickListener={this.handleCellClick} />
                    <Cell cellIndex={3} value={this.props.list[2]} cellClickListener={this.handleCellClick} />
                    <Cell cellIndex={4} value={this.props.list[3]} cellClickListener={this.handleCellClick} />
                    <Cell cellIndex={5} value={this.props.list[4]} cellClickListener={this.handleCellClick} />
                    <Cell cellIndex={6} value={this.props.list[5]} cellClickListener={this.handleCellClick} />
                    <Cell cellIndex={7} value={this.props.list[6]} cellClickListener={this.handleCellClick} />
                    <Cell cellIndex={8} value={this.props.list[7]} cellClickListener={this.handleCellClick} />
                    <Cell cellIndex={9} value={this.props.list[8]} cellClickListener={this.handleCellClick} />
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