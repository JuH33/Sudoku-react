import React, { Component } from 'react'
import { Popup, Grid, Input } from 'semantic-ui-react'

class Popups extends Component {

    render() {

        return (
            <Popup trigger={this.props.element}
                flowing
                position={'top center'}
                on={'click'}
                hoverable
                hideOnScroll>
                <Grid centered divided columns={1}>
                    <Grid.Column textAlign='center'>
                        <Input
                            action={{ color: 'violet', icon: 'numbered list' }}
                            actionPosition='left'
                            placeholder='Enter Value...'
                            defaultValue=''
                            type="number"
                            autoFocus
                            onChange={this.props.changeListener}
                        />
                    </Grid.Column>
                </Grid>
            </Popup>
        );
    }
}

export default Popups;