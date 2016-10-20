/*
 * @Author: JerryC (huangjerryc@gmail.com)
 * @Date: 2016-10-20 16:37:32
 * @Last Modified by: JerryC
 * @Last Modified time: 2016-10-20 23:14:34
 * @Description
 */

const SocketClient = require('socket.io-client');

const Controllers = {
  TickTock: SocketClient.connect('ws://localhost:8080/api/tickTock'),
}

Controllers.TickTock.on('message', console.log)
Controllers.TickTock.send('message', 'hi');



