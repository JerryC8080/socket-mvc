'use strict';

/*
 * @Author: JerryC (huangjerryc@gmail.com)
 * @Date: 2016-10-20 18:10:40
 * @Last Modified by: JerryC
 * @Last Modified time: 2016-10-20 22:10:05
 * @Description
 */

var EventEmitter = require('events');
var TickTockService = new EventEmitter();

var tickTock = true;

// Tick tock tick tock ......
setInterval(function () {
  TickTockService.emit('message', tickTock ? 'tick' : 'tock');
  tickTock = !tickTock;
}, 1000);

module.exports = TickTockService;