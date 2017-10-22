import React, { Component } from 'react';
import Sudoku from './sudoku_elements/Sudoku';
import { Container, Divider, Dropdown, Grid, Header, Image, List, Menu, Segment } from 'semantic-ui-react'
import styles from './css/App.css';
import Contact from './global/Contact';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = { difficulty: 'Easy' }
  }

  handlClick(level) {
    this.setState({
      difficulty: level
    });
  }

  render() {
    return (
      <div>
        <Menu inverted color="violet">
          <Container>
            <Menu.Item as='a' header>
              <Image size='mini'
                src='http://jdam.cd/wp-content/uploads/2015/03/sudoku_512.png'
                style={{ marginRight: '1.5em' }} />
              React Sudoku
            </Menu.Item>
            <Dropdown item simple text='Level'>
              <Dropdown.Menu>
                <Dropdown.Item onClick={() => { this.handlClick('Easy') }}>Low</Dropdown.Item>
                <Dropdown.Item onClick={() => { this.handlClick('Medium') }}>Medium</Dropdown.Item>
                <Dropdown.Item onClick={() => { this.handlClick('Hard') }}>Hard</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Container>
        </Menu>

        <Container text>
          <Header as='h1'>Super React-Sudoku built with ReactJS</Header>
          <h4> Difficulty: {this.state.difficulty} </h4>
          <div className="sudoku">
            <Sudoku difficulty={this.state.difficulty} />
          </div>
        </Container>

        <Segment
          inverted
          vertical
          style={{ margin: '5em 0em 0em', padding: '5em 0em' }}
        >
          <Container textAlign='center'>
            <Grid divided inverted stackable>
              <Grid.Row>
                <Grid.Column>
                  <Header inverted as='h4' content='Sudoku-reactJS' />
                  <p>A simple procedural generated sudoku grid using ReactJS.</p>
                </Grid.Column>
              </Grid.Row>
            </Grid>

            <Divider inverted section />
            <Image
              centered
              size='mini'
              src='http://jdam.cd/wp-content/uploads/2015/03/sudoku_512.png'
            />
            <List horizontal inverted divided link>
              <List.Item as={Contact}>Contact Me</List.Item>
              <List.Item as='a' href='#'>Terms and Conditions</List.Item>
              <List.Item as='a' href='#'>Privacy Policy</List.Item>
            </List>
          </Container>
        </Segment>
      </div>
    );
  }
}

export default App;

