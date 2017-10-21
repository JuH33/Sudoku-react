import React, { Component } from 'react'
import { Table } from 'semantic-ui-react';
import Popups from '../global/Popup';

class Cell extends Component {
    constructor(props) {
        super(props);

        this.changeListener = this.changeListener.bind(this);
        this.state = { value: props.value, popup: null }
    }

    changeListener(value) {
        if (value.target.value > 9) {
            value.target.value = value.target.value % 10;
        } else if (value.target.value <= 0) {
            value.target.value = 0;
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

        if (rowIndex % 3 === 0)
            style.push('bottom');

        if (cellIndex % 3 === 0)
            style.push('right');

        if (cellIndex === 1)
            style.push('left');

        return style.join(' ');
    }

    handleClick(e) {
        // Silence for now
        // const nValue = parseInt(this.state.value) + 1;

        // this.props.cellClickListener(this.props.cellIndex, nValue);
        // this.setState({ value: nValue });
    }

    render() {

        return (
            <Table.Cell className={this.shouldBeStyled()} textAlign={'center'} onClick={(e) => { this.handleClick(e); }}>
                <Popups changeListener={this.changeListener} element={<div>{this.state.value}</div>} />
            </Table.Cell>
        );
    }
}

export default Cell;