import React, { Component } from 'react';
import './App.css';

class Gallery extends Component {
  render() {
    console.log('gallery props', this.props);
    //render these props in an array - use map function.
    // const tracks = this.props.track
    const { tracks } = this.props;

    return (
      <div className="track-wrapper">
        {tracks.map((track, index) => {
          const trackImg = track.album.images[0].url;
          return (
            <div
            key={index}
            className="track"
            >
              <img
                src={trackImg}
                className="track-image"
                alt="track"
              />
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

