import React, { Component } from 'react';
import Row from './Row';
import { Table, Button, Modal, Header, Icon } from 'semantic-ui-react';
import Generator from '../sudoku_engine/Generator';
import Controller from '../sudoku_engine/Controller';

class Sudoku extends Component {
  constructor(props) {
    super(props);

    this.handleRowClick = this.handleRowClick.bind(this);
    this.generatorInstance = new Generator();
    this.controllerInstance = new Controller();

    this.title = 'Validation issue'
    this.header = 'Your grid is not completed!';
    this.content = 'Please, make sure to complit the grid before validate it.';

    this.state = {
      count: 0,
      modalOpen: false,
      valuesList: this.generatorInstance.buildResponseArray(),
      historic: null,
      key: Array(9).fill('').map((n, i) => i),
      freezedList: Array(9).fill(Array(9).fill(false))
    };
  }

  componentDidMount() {

  }

  componentWillUnmount() {
    console.log("Sudoku has been unmounted");
  }

  handleRowClick(rowIndex, cellIndex, cellValue) {
    let list = this.state.valuesList.slice();
    list[rowIndex - 1][cellIndex - 1] = cellValue;

    this.setState({
      valuesList: list,
      key: this.state.key.map((n, i) => list[i].join(''))
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
    const freezedValues = result.map((n) => n.map(v => !(v !== '-')));
    const historic = JSON.parse(JSON.stringify(result));

    this.setState({
      historic: historic,
      valuesList: result,
      key: this.state.key.map((n, i) => result[i].join('')),
      freezedList: freezedValues
    });
  }

  reset() {
    let result = JSON.parse(JSON.stringify(this.state.historic));
    const freezedValues = result.map((n) => n.map(v => !(v !== '-')));

    this.setState({
      valuesList: result,
      key: this.state.key.map((n, i) => i),
      freezedList: freezedValues
    })
  }

  validate() {
    let isCompleted = true;
    let isOk = false;
    for (let i = 0; i < 9; i++)
      if (this.state.valuesList[i].indexOf('-') !== -1) {
        isCompleted = false;
        break;
      }

    if (isCompleted) {
      isOk = this.controllerInstance.controllFullResponse(this.state.valuesList);
    } else {
      this.setState({modalOpen: true});
    }

    if (isOk) {
      this.title = 'Puzzle Completed'
      this.header = "Congratulation, you got it!";
      this.content = "Soon you will be able to check historic and save you sudoku, stay tuned!";
      this.setState({modalOpen: true});
    } else {
      this.title = 'Puzzle Invalid'
      this.header = "Woops, you grid is not valid!";
      this.content = "Don't forget to check either: Row, Subgrid and column for indetical numbers";
      this.setState({modalOpen: true});
    }
  }

  handleOpen = () => this.setState({ modalOpen: true })

  handleClose = () => this.setState({ modalOpen: false })

  render() {

    return (
      <span>
        <Button icon={'puzzle'} color={this.props.color} label={'Generate Puzzle'} onClick={() => { this.call() }} />
        <Table celled>
          <Table.Body>
            <Row rowIndex={1} key={this.state.key[0]} upIndexValue={this.handleRowClick} list={this.state.valuesList[0]} freez={this.state.freezedList[0]} />
            <Row rowIndex={2} key={this.state.key[1]} upIndexValue={this.handleRowClick} list={this.state.valuesList[1]} freez={this.state.freezedList[1]} />
            <Row rowIndex={3} key={this.state.key[2]} upIndexValue={this.handleRowClick} list={this.state.valuesList[2]} freez={this.state.freezedList[2]} />
            <Row rowIndex={4} key={this.state.key[3]} upIndexValue={this.handleRowClick} list={this.state.valuesList[3]} freez={this.state.freezedList[3]} />
            <Row rowIndex={5} key={this.state.key[4]} upIndexValue={this.handleRowClick} list={this.state.valuesList[4]} freez={this.state.freezedList[4]} />
            <Row rowIndex={6} key={this.state.key[5]} upIndexValue={this.handleRowClick} list={this.state.valuesList[5]} freez={this.state.freezedList[5]} />
            <Row rowIndex={7} key={this.state.key[6]} upIndexValue={this.handleRowClick} list={this.state.valuesList[6]} freez={this.state.freezedList[6]} />
            <Row rowIndex={8} key={this.state.key[7]} upIndexValue={this.handleRowClick} list={this.state.valuesList[7]} freez={this.state.freezedList[7]} />
            <Row rowIndex={9} key={this.state.key[8]} upIndexValue={this.handleRowClick} list={this.state.valuesList[8]} freez={this.state.freezedList[8]} />
          </Table.Body>
        </Table>

        <Button.Group size='medium' floated={'right'}>
          <Button color={'violet'} onClick={() => { this.reset(); }}>Reset puzzle</Button>
          <Button.Or />
          <Modal
            trigger={<Button color={'orange'} onClick={() => { this.validate(); }}>Valid puzzle</Button>}
            open={this.state.modalOpen}
            onClose={this.handleClose}
            basic
            size='small'
          >
            <Header icon='browser' content={this.title} />
            <Modal.Content>
              <h3>{this.header}</h3>
              <p>{this.content}</p>
            </Modal.Content>
            <Modal.Actions>
              <Button color='green' onClick={this.handleClose} inverted>
                <Icon name='checkmark' /> Got it
          </Button>
            </Modal.Actions>
          </Modal>
        </Button.Group>

      </span>
    );
  }
}

export default Sudoku;
