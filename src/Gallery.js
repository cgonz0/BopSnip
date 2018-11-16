import React, { Component } from 'react';
import './App.css';

class Gallery extends Component {

  constructor(props) {
    super(props);
    this.state = {
      playingUrl: '',
      audio: null,
      playing: false
    }
  }

  playAudio(previewUrl) {
    //declare new audio object
    let audio = new Audio(previewUrl);
    if (!this.state.playing) {
      audio.play();
      this.setState({
        playing: true,
        playingUrl: previewUrl,
        audio
      })
    } else {
      if (this.state.playingUrl === previewUrl) {
        this.state.audio.pause();
        this.setState({
          playing: false
        })
      } else {
        this.state.audio.pause();
        audio.play();
        this.setState({
          playing: true,
          playingUrl: previewUrl,
          audio
        })
      }
    }
  }

 handleClick = preview_url => () => {
   this.playAudio(preview_url);
 }

  render() {
    // console.log('gallery props', this.props);
    //render these props in an array - use map function.
    // const tracks = this.props.track
    const { tracks } = this.props;

    return (
      <div className="track-wrapper">
        {tracks.map((track, index) => {
          // console.log('track', track);
          const trackImg = track.album.images[0].url;
          return (
            <div
            key={index}
            className="track"
            // onClick={() => this.playAudio(track.preview_url)}
            onClick={this.handleClick(track.preview_url)}
            >
              <img
                src={trackImg}
                className="track-image"
                alt="track"
              />
              <div className="track-play">
                <div className="track-play-inner">
                  {
                    this.state.playingUrl === track.preview_url
                    ? <span className="pause">| |</span>
                    : <span>&#9654;</span>
                  }
                </div>
              </div>
              <p className="track-text">
                {track.name}
              </p>
            </div>
          )
        })}
      </div>
    )
  }
}

export default Gallery;

