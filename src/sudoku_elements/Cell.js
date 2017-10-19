import React, {Component} from 'react'
import { Table } from 'semantic-ui-react';
import Popups from '../global/Popup';

class Cell extends Component {
    constructor(props) {
        super(props);

        this.changeListener = this.changeListener.bind(this);
        this.state = { value: props.value, popup: null }
    }

    changeListener(value) {
        this.props.cellClickListener(this.props.cellIndex, value.target.value || 0);
        this.setState({
            value: value.target.value || 0
        })
    }

    handleClick(e) {
        // Silence for now
        // const nValue = parseInt(this.state.value) + 1;
        
        // this.props.cellClickListener(this.props.cellIndex, nValue);
        // this.setState({ value: nValue });
    }

    render() {

        return (
            <Table.Cell textAlign={'center'} onClick={(e) => { this.handleClick(e); }}>
                <Popups changeListener={this.changeListener} element={<div>{this.state.value}</div>} />
            </Table.Cell>
        );
    }
}

export default Cell;