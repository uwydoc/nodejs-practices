#!/usr/bin/env node
/**
 * @file tcp_client.js
 *
 * @breif Simple tcp client that connects to the tcp_server and test it
 */
var net = require('net');

var client = net.connect({port: 8124}, function() {
  console.log('client connected');
  client.write('world!\r\n');
});

client.on('data', function(data) {
  console.log(data.toString());
  client.end();
});
client.on('end', function() {
  console.log('client disconnected');
});
