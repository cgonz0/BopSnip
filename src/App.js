
import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { FormGroup, FormControl, InputGroup, Glyphicon} from 'react-bootstrap';
import Profile from './Profile';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      query: '',
      artist: null
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
    const BASE_URL = 'https://api.spotify.com/v1/search?';
    const FETCH_URL = `${BASE_URL}q=${this.state.query}&type=artist&limit=1`;
    const accessToken = '';

    // const myHeaders = new Headers();

    const myOptions = {
      method: 'GET',
      headers:  {
        Authorization: `Bearer ${accessToken}`
     },
      mode: 'cors',
      cache: 'default'
    };

    fetch(FETCH_URL, myOptions)
      .then(response => response.json())
      .then(json => {
        const artist = json.artists.items[0];
        console.log('artist', artist);
        this.setState({artist});
      });
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

       <Profile
        artist={this.state.artist}
       />

       <div className="Gallery">
        <div>Gallery</div>
       </div>

      </div>
    );
  }
}

export default App;
