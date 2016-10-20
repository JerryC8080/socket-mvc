/*
 * @Author: JerryC (huangjerryc@gmail.com)
 * @Date: 2016-10-20 18:10:40
 * @Last Modified by: JerryC
 * @Last Modified time: 2016-10-20 22:10:05
 * @Description
 */

const EventEmitter = require('events');
let TickTockService = new EventEmitter;

let tickTock = true;

// Tick tock tick tock ......
setInterval(() => {
  TickTockService.emit('message', tickTock ? 'tick' : 'tock');
  tickTock = !tickTock;
}, 1000)


module.exports = TickTockService