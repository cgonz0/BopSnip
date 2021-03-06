import React, { Component } from 'react';
import logo from './bopsnip_logo.svg';
import './App.css';
import { FormGroup, FormControl, InputGroup, Glyphicon} from 'react-bootstrap';
import Profile from './Profile';
import Gallery from './Gallery';
import Spotify from './Spotify';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      query: '',
      artist: null,
      //initialize tracks to empty array
      tracks: []
    };
    // this.handleChange = this.handleChange.bind(this);
    // this.handleClick = this.handleClick.bind(this);
  }

  handleChange = event => {
    const query = event.target.value;
    sessionStorage.setItem('query', query); // store the current search term to local storage
    this.setState({
      query: query
    });
  }

  componentWillMount() { // set the previous search term in the state, if it exists in sessionStorage
    let query = sessionStorage.getItem('query');
    if (query) {
        this.setState({ query: query })
    }
  }

  search() {

    const accessToken = Spotify.getAccessToken();

    const BASE_URL = 'https://api.spotify.com/v1/search?';
    let FETCH_URL = `${BASE_URL}q=${this.state.query}&type=artist&limit=1`;
    const ALBUM_URL = 'https://api.spotify.com/v1/artists/';

    const myOptions = {
      method: 'GET',
      headers:  {
        Authorization: `Bearer ${accessToken}`
      }
    };

    fetch(FETCH_URL, myOptions)
      .then(response => response.json())
      .then(json => {
        const artist = json.artists.items[0];
        // console.log('artist', artist);
        this.setState({artist});

        //Fetch albums
        FETCH_URL = `${ALBUM_URL}${artist.id}/top-tracks?country=US&`
        fetch(FETCH_URL, myOptions)
        .then(response => response.json())
        .then(json => {
          // console.log('artist top tracks:', json);
          //set tracks to state

          //variable name and key we want to access within function or obj is same (useful for multiple keys:
          // const tracks = json.tracks;
          const { tracks } = json;

          this.setState({tracks});
        })
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
       <img src={logo} className="App-logo" alt="logo" />
       {/* <div className="App-title">BopSnip</div> */}
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

       {
         this.state.artist !== null
          ?<div>
            <Profile
              artist={this.state.artist}
            />
            <Gallery
            //pass tracks to state
              tracks={this.state.tracks}
            />
          </div>

          : <div></div>
       }

      </div>
    );
  }
}

export default App;
