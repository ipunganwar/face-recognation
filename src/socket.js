import socket from "socket.io-client";

var app = {
  socket: null,
  connect: function() {
    var self = this;
    if( self.socket ) {
      self.socket.destroy();
      delete self.socket;
      self.socket = null;
    }
    this.socket = socket.connect( 'http://127.0.0.1:3000', {
      reconnection: true,
      reconnectionDelay: 1000,
      reconnectionDelayMax : 5000,
      reconnectionAttempts: Infinity
    } );
    this.socket.on( 'connect', function () {
      console.log( 'connected to server' );
    } );
    this.socket.on( 'disconnect', function () {
      console.log( 'disconnected from server' );
      window.setTimeout( 'app.connect()', 5000 );
    } );
  }
}

export { app }
