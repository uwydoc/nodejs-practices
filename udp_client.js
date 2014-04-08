#!/usr/bin/env node
/**
 * @file udp_client.js
 *
 * @breif Simple udp client to communicate with udp_server
 */
var dgram = require('dgram');

var message = new Buffer('深入浅出Node.js');
var client = dgram.createSocket('udp4');
client.send(message, 0, message.length, 41234, 'localhost',
    function(err, bytes) {
  if (err) throw err;
  client.close();
});
