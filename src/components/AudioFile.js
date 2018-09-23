
import React, { Component } from 'react';
// import AudioFile from './AudioFile'

export default class AudioFile extends Component {

  render() {
    return (
      <div>
        <audio autoPlay>
          <source src={"http://192.168.88.20:8100/api/audiofile/"+audioUrl} />
        </audio>
      </div>
    )
  }
}

