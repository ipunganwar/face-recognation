import React, { Component } from 'react';
import calender from '../assets/image/calendar.svg';
import clock from '../assets/image/clock.svg';
import '../App.css';
import { spesifyGender } from '../helper/gender';
import ReactAudioPlayer from 'react-audio-player';

export default class SingleRecognationFace extends Component {
	capitalize(name) {
		let lower = name.split(' ')[0].slice(0, 30);
		let upper = lower.charAt(0).toUpperCase() + lower.slice(1);
		return upper;
	}

	render() {
		return (
			<div className="container">
				{this.props.customers.map((item, i) => (
					<div className="container-single" key={i}>
						<img
							className="images-first"
							src={`data:image/png;base64,${item.thumbnail}`}
							alt="1st picture"
						/>
						<p className="text-name">
							{`${spesifyGender(item.additional_fields)} ${this.capitalize(item.name)}`}
						</p>
						<audio autoPlay>
							<source
								src={
									`http://${process.env.REACT_APP_IP_SERVER}:${
										process.env.REACT_APP_PORT_SERVER
									}/api/audiofile/` + item.audioUrl
								}
							/>
						</audio>
					</div>
				))}

				<p className="text-welcome">Welcome to Nodeflux Donkey Camp</p>
				<img className="date-icon" src={calender} alt="1st picture" />
				<p className="date">{new Date(this.props.timestamp).toDateString()}</p>
				<img className="time-icon" src={clock} alt="1st picture" />
				<p className="time">
					{new Date(this.props.timestamp).toLocaleTimeString()}
				</p>
			</div>
		);
	}
}
