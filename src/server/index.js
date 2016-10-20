/*
 * @Author: JerryC (huangjerryc@gmail.com)
 * @Date: 2016-10-20 18:12:26
 * @Last Modified by: JerryC
 * @Last Modified time: 2016-10-20 22:49:11
 * @Description
 */

require('babel-polyfill');
require('./bootstrap.js')
  .default()
  .catch(console.error);

