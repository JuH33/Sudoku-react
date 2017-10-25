import React, { Component } from 'react'
import { Table } from 'semantic-ui-react';
import Popups from '../global/Popup';

class Cell extends Component {
    constructor(props) {
        super(props);

        this.changeListener = this.changeListener.bind(this);
        this.state = { value: props.value, popup: null, isHighlighted: false }
    }

    changeListener(value) {
        if (!this.props.editable)
            return false;

        if (value.target.value > 9) {
            value.target.value = value.target.value % 10;
        } else if (value.target.value <= 1) {
            value.target.value = 1;
        }

        value.target.value = +value.target.value;

        this.props.cellClickListener(this.props.cellIndex, value.target.value || 0);
        this.setState({
            value: value.target.value || 0
        })
    }

    shouldBeStyled() {
        const style = [];
        const { rowIndex, cellIndex } = this.props;

        if (rowIndex % 3 === 0 && rowIndex !== 9)
            style.push('bottom');

        if (cellIndex % 3 === 0 && cellIndex !== 9)
            style.push('right');

        if (this.state.isHighlighted)
            style.push('highlighted');

        return style.join(' ');
    }

    highlightCell(e, value = false) {
        if (!this.props.editable)
            return false;

        this.setState({
            isHighlighted: value
        });
    }

    render() {

        return (
            <Table.Cell className={this.shouldBeStyled()} textAlign={'center'} onMouseEnter={(e) => this.highlightCell(e, true)} onMouseLeave={(e) => this.highlightCell(e, false)} >
                { (this.props.editable) ? (<Popups changeListener={this.changeListener} element={<div>{this.state.value}</div>} />) : <div className="freez">{this.state.value}</div> }
            </Table.Cell>
        );
    }
}

export default Cell;