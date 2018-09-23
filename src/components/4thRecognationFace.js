import React, { Component } from 'react';
import calender from '../assets/image/calendar.svg'
import clock from '../assets/image/clock.svg'
import '../App.css';
import ReactAudioPlayer from 'react-audio-player';

export default class FourthRecognationFace extends Component {
  constructor(props) {
		super(props);
		this.state = {
      audio: []
    }
	}

  capitalize (name) {
    let lower = name.split(" ")[0].slice(0, 7)
    let upper = lower.charAt(0).toUpperCase() + lower.slice(1)
    return upper
  }

  audioPlayer () {
    let audioUrl = JSON.parse(JSON.stringify([...this.state.audio]))
    let post = audioUrl[this.state.audio.length-1]
    return (
      <ReactAudioPlayer
        src={`http://${process.env.REACT_APP_IP_SERVER}:${process.env.REACT_APP_PORT_SERVER}/api/audiofile/${post}` }
        autoPlay
      />
    )
  }

  componentDidUpdate(prevProps) {
    if( this.props.audio.length < prevProps.audio.length ) {
      this.setState({ audio: prevProps.audio })
    }
  }

  componentWillMount() {
    this.setState({ audio: this.props.audio })
  }

  render() {
    return (
      <div className="container">
        <div className="container-4th">
          {this.props.customers.map((item, i) =>
             i % 2 === 0 ?
            (
                <div className="" key={i}>
                  <img className="images-4th-left" src={item.images} alt="4th picture"/>
                  <p className="text-name-4th-left">Hi, <span>{this.capitalize(item.name)}</span></p>
                </div>
            ) : (
                <div className="tes" key={i}>
                  <img className="images-4th-right" src={item.images} alt="4th picture right"/>
                  <p className="text-name-4th-right">Hi, <span className="">{this.capitalize(item.name)}</span></p>
                </div>
            )
          )}
          { this.audioPlayer() }
          <p className="text-welcome-4th">Selamat Datang di Kantor PINS</p>
          <img className="date-icon-4th" src={calender} alt="1st picture"/>
          <p className="date-4th">{new Date(this.props.timestamp).toDateString()}</p>
          <img className="time-icon-4th" src={clock} alt="1st picture"/>
          <p className="time-4th">{new Date(this.props.timestamp).toLocaleTimeString()}</p>
        </div>
      </div>
    );
  }
}
