import React, { Component } from 'react';
import calender from '../assets/image/calendar.svg';
import clock from '../assets/image/clock.svg';
import '../App.css';
import { spesifyGender } from '../helper/gender';
import ReactAudioPlayer from 'react-audio-player';

export default class ThirdRecognationFace extends Component {
	capitalize(name) {
		let lower = name.split(' ')[0].slice(0, 30);
		let upper = lower.charAt(0).toUpperCase() + lower.slice(1);
		return upper;
	}

	audioPlayer() {
		let audioUrl = this.props.audio[this.props.audio.length - 1];
		return (
			<audio autoPlay>
				<source
					src={
						`http://${process.env.REACT_APP_IP_SERVER}:${
							process.env.REACT_APP_PORT_SERVER
						}/api/audiofile/` + audioUrl
					}
				/>
			</audio>
		);
	}

	render() {
		return (
			<div className="container">
				{this.props.customers.map((item, i) => (
					<div className="container-3rd" key={i}>
						<img
							className="images-3rd"
							src={`data:image/png;base64,${item.thumbnail}`}
							alt="3rd picture"
						/>
						<p className="text-name-3rd">
							{spesifyGender(item.additional_fields)}
							&nbsp;
							<span className="span-text-name-double">
								{this.capitalize(item.name)}
							</span>
						</p>
					</div>
				))}

				{this.audioPlayer()}

				<p className="text-welcome-double">Welcome to Nodeflux Donkey Camp</p>
				<img className="date-icon-double" src={calender} alt="1st picture" />
				<p className="date-double">
					{new Date(this.props.timestamp).toDateString()}
				</p>
				<img className="time-icon" src={clock} alt="1st picture" />
				<p className="time-double">
					{new Date(this.props.timestamp).toLocaleTimeString()}
				</p>
			</div>
		);
	}
}
