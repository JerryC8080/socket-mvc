/*
 * @Author: JerryC (huangjerryc@gmail.com)
 * @Date: 2016-10-20 22:38:24
 * @Last Modified by: JerryC
 * @Last Modified time: 2016-10-20 23:10:44
 * @Description
 */

import SocketIO from 'socket.io';
import fs from 'fs';
import Promise from 'bluebird';
import path from 'path';

const fsAsync = Promise.promisifyAll(fs);

async function loadFiles(dir) {
  let files = await fsAsync.readdirAsync(path.join(__dirname, `./${dir}`));
  files.forEach((file) => {
    let filename = path.parse(file).name;
    global[filename] = global.app[dir][filename] = require(`./${dir}/${file}`);
  });
  return global.app;
}

async function loadSocket(){
  // create io server, listen on ws://localhost:8080/  
  const io = SocketIO(8080);
  global.app.socket = io;  
  return global.app;
}

async function loadRoute(app) {
  const routes = global.app.config.routes;
  const io = global.app.socket;
  const controllers = global.app.controllers;

  // init routes
  Object.keys(routes).forEach((path) => {
    let controller = routes[path];
    let nsp = io.of(path);
    controllers[controller](nsp);
  });
}

async function main() {
  if (!global.app) global.app = { services: {}, controllers: {}, config: {} };

  // loadServices
  await loadFiles('services');

  // loadControllers
  await loadFiles('controllers');

  // loadConfig
  await loadFiles('config');

  // loadSocket server
  await loadSocket();

  // loadRoute
  await loadRoute(global.app);

}

export default main;