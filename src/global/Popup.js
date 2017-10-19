import React, {Component} from 'react'
import { Popup, Grid, Input } from 'semantic-ui-react'

class Popups extends Component {

    render() {

        return (
        <Popup trigger={this.props.element}
               flowing
               hoverable>
            <Grid centered divided columns={1}>
                <Grid.Column textAlign='center'>
                    <Input
                        action={{ color: 'teal', labelPosition: 'left', icon: 'cart', content: 'Value' }}
                        actionPosition='left'
                        placeholder='Enter Value...'    
                        defaultValue=''
                        type="number"
                        onChange={this.props.changeListener}
                    />
                </Grid.Column>
            </Grid>
        </Popup>
        );
    }
}

export default Popups;