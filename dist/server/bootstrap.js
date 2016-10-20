'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var loadFiles = function () {
  var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(dir) {
    var files;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return fsAsync.readdirAsync(_path2.default.join(__dirname, './' + dir));

          case 2:
            files = _context.sent;

            files.forEach(function (file) {
              var filename = _path2.default.parse(file).name;
              global[filename] = global.app[dir][filename] = require('./' + dir + '/' + file);
            });
            return _context.abrupt('return', global.app);

          case 5:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function loadFiles(_x) {
    return _ref.apply(this, arguments);
  };
}();

var loadSocket = function () {
  var _ref2 = _asyncToGenerator(regeneratorRuntime.mark(function _callee2() {
    var io;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            // create io server, listen on ws://localhost:8080/  
            io = (0, _socket2.default)(8080);

            global.app.socket = io;
            return _context2.abrupt('return', global.app);

          case 3:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, this);
  }));

  return function loadSocket() {
    return _ref2.apply(this, arguments);
  };
}();

var loadRoute = function () {
  var _ref3 = _asyncToGenerator(regeneratorRuntime.mark(function _callee3(app) {
    var routes, io, controllers;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            routes = global.app.config.routes;
            io = global.app.socket;
            controllers = global.app.controllers;

            // init routes

            Object.keys(routes).forEach(function (path) {
              var controller = routes[path];
              var nsp = io.of(path);
              controllers[controller](nsp);
            });

          case 4:
          case 'end':
            return _context3.stop();
        }
      }
    }, _callee3, this);
  }));

  return function loadRoute(_x2) {
    return _ref3.apply(this, arguments);
  };
}();

var main = function () {
  var _ref4 = _asyncToGenerator(regeneratorRuntime.mark(function _callee4() {
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            if (!global.app) global.app = { services: {}, controllers: {}, config: {} };

            // loadServices
            _context4.next = 3;
            return loadFiles('services');

          case 3:
            _context4.next = 5;
            return loadFiles('controllers');

          case 5:
            _context4.next = 7;
            return loadFiles('config');

          case 7:
            _context4.next = 9;
            return loadSocket();

          case 9:
            _context4.next = 11;
            return loadRoute(global.app);

          case 11:
          case 'end':
            return _context4.stop();
        }
      }
    }, _callee4, this);
  }));

  return function main() {
    return _ref4.apply(this, arguments);
  };
}();

var _socket = require('socket.io');

var _socket2 = _interopRequireDefault(_socket);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new _bluebird2.default(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return _bluebird2.default.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; } /*
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  * @Author: JerryC (huangjerryc@gmail.com)
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  * @Date: 2016-10-20 22:38:24
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  * @Last Modified by: JerryC
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  * @Last Modified time: 2016-10-20 23:10:44
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  * @Description
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  */

var fsAsync = _bluebird2.default.promisifyAll(_fs2.default);

exports.default = main;