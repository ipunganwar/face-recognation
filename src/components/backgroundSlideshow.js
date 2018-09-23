import React, { Component } from 'react';
import background from '../assets/image/license.png';
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';
import { Player, ControlBar, PlayToggle } from 'video-react';

export default class BackgroundSlideshow extends React.Component {
	constructor(props) {
		super(props);
		this.state = { backgroundIndex: 0 };
		this.changeBackground = this.changeBackground.bind(this);
	}

	componentDidMount() {
		this.timeout = setTimeout(
			this.changeBackground,
			this.props.animDuration * 1000
		);
	}

	componentWillUnmount() {
		if (this.timeout) clearTimeout(this.timeout);
	}

	changeBackground() {
		this.setState(
			function({ backgroundIndex }) {
				const nextBackgroundIndex = ++backgroundIndex % this.props.screensaver.length;
				return { backgroundIndex: nextBackgroundIndex };
			},
			function() {
				if (this.props.screensaver[this.state.backgroundIndex] == 'video') {
					this.timeout = setTimeout(
						this.changeBackground,
						this.props.animDuration * 2000
					);
				} else {
					this.timeout = setTimeout(
						this.changeBackground,
						this.props.animDuration * 1000
					);
				}
			}
		);
	}

	setTextTime() {
		let hours = new Date(this.props.timestamp).getHours();
		let minute = new Date(this.props.timestamp).getMinutes();
		if ((hours >= 3 && minute >= 0) && (hours <= 11 && minute <= 59)) {
			return <p className="text-name-morning">Good Morning</p>;
		} else if (hours >= 12 && minute >= 0 && (hours <= 17 && minute <= 59)) {
			return <p className="text-name-afternoon">Good Afternoon</p>;
		} else if (hours >= 18 && minute >= 0 && (hours <= 2 && minute <= 59)) {
			return <p className="text-name-evening">Good Evening</p>;
		} else {
			return <p className="text-name-evening">Good Evening</p>;
		}
	}

	setBackground(sectionStyle) {
		let wallpaper = this.props.screensaver[this.state.backgroundIndex];
		let image = sectionStyle.backgroundImage.split('.')[1];

		if (image != 'mp4)') {
			return (
				<div style={sectionStyle}>
					<div className="">
						<img src={background} height="1075" width="1915" />
					</div>
					<p className="text-name-screensaver">
						{new Date(this.props.timestamp).getHours() > 9 ?
							new Date(this.props.timestamp).getHours()
							:
							'0' + new Date(this.props.timestamp).getHours()
						}
						:
						{new Date(this.props.timestamp).getMinutes() > 9 ?
							new Date(this.props.timestamp).getMinutes()
							:
							'0' + new Date(this.props.timestamp).getMinutes()
						}
					</p>
					{this.setTextTime()}
				</div>
			);
		} else {
			return (
				<div className="videoContent">
					<div>
						{
							<Player
								className="videoPlayer"
								autoPlay
								fluid={false}
								width={1920}
								height={1080}
								src={
									process.env.PUBLIC_URL +
									this.props.screensaver[this.state.backgroundIndex]
								}
							>
								<ControlBar disableDefaultControls />
							</Player>
						}
					</div>

					<div className="background-video">
						<img src={background} height="1075" width="1915" />
					</div>
				</div>
			);
		}
	}

	render() {
		let tes =
			process.env.PUBLIC_URL +
			this.props.screensaver[this.state.backgroundIndex];
		var sectionStyle = {
			width: '1920px',
			height: '1080px',
			backgroundRepeat: 'no-repeat',
			backgroundImage: `url(${tes})`,
			backgroundSize: '1920px 1080px'
		};
		// console.log(process.env.PUBLIC_URL+this.props.screensaver[this.state.backgroundIndex])
		return (
			<div className="">
				<CSSTransitionGroup
					transitionName="example"
					transitionAppear={true}
					transitionEnter={false}
					transitionEnterTimeout={300}
					transitionLeaveTimeout={300}
				>
					{this.setBackground(sectionStyle)}
				</CSSTransitionGroup>
			</div>
		);
	}
}
