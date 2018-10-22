
import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { FormGroup, FormControl, InputGroup, Glyphicon} from 'react-bootstrap';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      query: ''
    };
    // this.handleChange = this.handleChange.bind(this);
    // this.handleClick = this.handleClick.bind(this);
  }

  handleChange = event => {
    this.setState({
      query: event.target.value
    });
  }

  search() {
    console.log('this.state', this.state)
  }


  handleEnterKeyPress = event => {
    if (event.key === 'Enter') {
      this.search();
    }
  }

  handleClick = event => {
    this.search()
  }


  render() {
    return (
      <div className="App">
       <div className="App-title">BopSnip</div>

       <FormGroup>
        <InputGroup>
          <FormControl
            type="text"
            placeholder="Search for an Artist"
            value={this.state.query}
            onChange={this.handleChange}
            onKeyPress={this.handleEnterKeyPress}
          />
          <InputGroup.Addon onClick={this.handleClick}>
            <Glyphicon glyph="search"></Glyphicon>
          </InputGroup.Addon>
        </InputGroup>
       </FormGroup>

       <div className="Profile">
        <div>
          Artist Photo
        </div>
        <div>
          Artist Name
        </div>
       </div>

       <div className="Gallery">
        <div>Gallery</div>
       </div>

      </div>
    );
  }
}

export default App;
