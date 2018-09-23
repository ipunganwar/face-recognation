import openSocket from 'socket.io-client';
const socket = openSocket(
	`http://${process.env.REACT_APP_IP_SERVER}:${
		process.env.REACT_APP_PORT_SERVER
	}`,
	{
		autoConnect: true,
		reconnectionDelay: 1000,
		reconnectionDelayMax: 5000
	}
);

function connect() {
	setTimeout(function() {
		socket.connect();
	}, 5000);
}

function subscribeToTimer(cb) {
	socket.connect();
	socket.on('timer', timestamp => cb(null, timestamp));
	socket.emit('subscribeToTimer', 1000);
}

function getDataApi(cb) {
	socket.on('dataCustomers', customers => cb(null, customers));
	socket.emit('getDataApi', 1000);
}

function getScreensaver(cb) {
	socket.on('dataScreensaver', screensaver => cb(null, screensaver));
	socket.emit('subscribeToTimer', 1000);
}

export { subscribeToTimer, getDataApi, getScreensaver };
