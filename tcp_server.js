#!/usr/bin/env node
/**
 * @file tcp_server.js
 *
 * @breif Simple tcp server to show using `net` package to create tcp service
 */
var net = require('net');

var server = net.createServer(function(socket) {
  // new connection
  socket.on('data', function(data) {
    socket.write('你好');
  });
  socket.on('end', function() {
    console.log('connection closed');
  });
  socket.write('欢迎阅读《深入浅出Node.js》示例：\n');
});

server.listen(8124, function() {
  console.log('server bound');
});
