'use strict';

/*
 * @Author: JerryC (huangjerryc@gmail.com)
 * @Date: 2016-10-20 18:00:01
 * @Last Modified by: JerryC
 * @Last Modified time: 2016-10-20 23:10:24
 * @Description
 */

var SignalHandler = {
  'name': function name() {
    // ... do logic
  }
};

var SocketHandler = function SocketHandler(socket) {
  console.log('An Client connected in TickTockController');
  socket.on('message', function (socket) {
    console.log('TickTockController does not handler message from Client');
  });
  socket.on('close', function (socket) {
    console.log('An Client disconnect in TickTockController');
  });

  socket.emit('message', 'Wellcome to TickTockController');

  // Register signal handler
  Object.keys(SignalHandler).forEach(function (key) {
    socket.on(key, SignalHandler[key]);
  });
};

function main(namespace) {

  // Hanlde connection
  namespace.on('connection', SocketHandler);

  // listen TickTockService, and send data to all client.
  TickTockService.on('message', function (data) {
    return namespace.send(data);
  });
}

module.exports = main;