import React, { Component } from 'react';
import './App.css';
import loading from './assets/background/loading.svg';
import { subscribeToTimer, getDataApi, getScreensaver, connect } from './api';
import SingleRecognationFace from './components/1stRecognationFace';
import DoubleRecognationFace from './components/2ndRecognationFace';
import ThirdRecognationFace from './components/3rdRecognationFace';
import FourthRecognationFace from './components/4thRecognationFace';
import SixthRecognationFace from './components/6thRecognationFace';
import BackgroundSlideshow from './components/backgroundSlideshow';

let timer;

class App extends Component {
	constructor() {
		super();
		this.state = {
			response: false,
			timestamp: new Date(),
			customers: [],
			tempCustomers: [],
			screensaver: [],
			video: false,
			audio: [],
		};
	}

	componentDidMount() {
		subscribeToTimer((err, timestamp) =>
			this.setState({
				timestamp
			})
		);

		getDataApi((err, customers) => {
			if (customers.length > 0) {
				let foldername = this.state.tempCustomers
					.map(item => {
						return item.foldername;
					})
					.indexOf(customers[0].foldername);
				if (foldername < 0 && this.state.customers.length <= 2) {
					let newDataTemp = this.state.tempCustomers;
          let newData = this.state.customers;
          let audioTemp = this.state.audio;
					newDataTemp.push(customers[0]);
          newData.push(customers[0]);
          audioTemp.push(customers[0].audioUrl)
					this.setState({
						tempCustomers: [...newDataTemp],
            customers: [...newData],
            audio: [...audioTemp]
					});
					this.resetDataApi(30);
          this.resetDataApiTemp(600)
          this.resetDataAudio(600)
				}
			}
		});

		getScreensaver((err, screensaver) => {
			let data = [];
			screensaver.forEach(item => {
				data.push('/images/screensaver/' + item);
			});

			this.setState({ screensaver: data });
		});
	}

	screenSaver() {
		let { timestamp } = this.state;
	}

	resetTimer () {
		clearTimeout(timer)
	}

	resetDataApi(timeout) {
		timer = setTimeout(() => {
			this.setState({ customers: [] });
		}, timeout * 1000);
	}

	resetDataApiTemp(timeout) {
		timer = setTimeout(() => {
			this.setState({ tempCustomers: [] });
		}, timeout * 1000);
  }
  
  resetDataAudio(timeout) {
		timer = setTimeout(() => {
			this.setState({ audio: [] });
		}, timeout * 1000);
	}

	// getDataApi() {
    // let { customers, screensaver, audio } = this.state;

	// 	if (customers.length === 0) {
	// 		return (
	// 			<div className="container">
	// 				<img className="loading" src={loading} alt="loading" />

	// 				<p className="text-welcome-loading">welcome to PINS Office</p>
	// 				<p className="date-loading">
	// 					{new Date(this.state.timestamp).toDateString()}
	// 				</p>
	// 				<p className="time-loading">
	// 					{new Date(this.state.timestamp).toLocaleTimeString()}
	// 				</p>
	// 			</div>
	// 		);
	// 	} else if (customers.length === 1) {
	// 		return (
	// 			<SingleRecognationFace
	// 				customers={this.state.customers}
	// 				timestamp={this.state.timestamp}
					
	// 			/>
	// 		);
	// 	} else if (customers.length === 2) {
	// 		return (
	// 			<DoubleRecognationFace
	// 				customers={this.state.customers}
    //       timestamp={this.state.timestamp}
    //       audio={this.state.audio}
	// 			/>
	// 		);
	// 	} else if (customers.length > 2 && customers.length <= 4) {
	// 		return (
	// 			<FourthRecognationFace
	// 				customers={this.state.customers}
    //       timestamp={this.state.timestamp}
    //       audio={this.state.audio}
	// 			/>
	// 		);
	// 	} else {
	// 		return (
	// 			<SixthRecognationFace
	// 				customers={this.state.customers.slice(0, 6)}
    //       timestamp={this.state.timestamp}
    //       audio={this.state.audio}
	// 			/>
	// 		);
	// 	}
	// }

	getDataApi() {
    let { customers, screensaver, audio } = this.state;
			switch (customers.length) {
				case 0 :
					return (
						<div className="container">
							<img className="loading" src={loading} alt="loading" />
		
							<p className="text-welcome-loading">welcome to PINS Office</p>
							<p className="date-loading">
								{new Date(this.state.timestamp).toDateString()}
							</p>
							<p className="time-loading">
								{new Date(this.state.timestamp).toLocaleTimeString()}
							</p>
						</div>
					);
					break;
				
				case 1 :
					return (
						<SingleRecognationFace
							customers={this.state.customers}
							timestamp={this.state.timestamp}
							
						/>
					);
					break;
				
				case 2 :
					return (
						<DoubleRecognationFace
							customers={this.state.customers}
							timestamp={this.state.timestamp}
							audio={this.state.audio}
						/>
					);
					break;

				case 3 :
					return (
						<ThirdRecognationFace
							customers={this.state.customers}
							timestamp={this.state.timestamp}
							audio={this.state.audio}
						/>
					);
					break;
      }
	}

	render() {
		let tes = process.env.PUBLIC_URL + '/images/background/background.jpg'
		let ayam = this.state.screensaver[0] !== 'undefined' ? 'background' : 'oke';
		console.log('recognize', this.state.tempCustomers)
		// console.log('customers', this.state.customers.length)
		return (
			<div>
				{this.state.customers.length === 0 ? (
					<BackgroundSlideshow
						animDuration={30}
						timestamp={this.state.timestamp}
						screensaver={this.state.screensaver}
					/>
				) : (
					<div className="">
            <img className="lalala" src={tes} alt="1st picture"/>
						<div className="logo">{this.getDataApi()}</div>
					</div>
				)}
			</div>
		);
	}
}

export default App;
