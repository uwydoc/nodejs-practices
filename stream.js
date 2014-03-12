#!/usr/bin/env node
/**
 * @file stream.js
 *
 * Custom object to inherit from EventEmitter, with the help of `util'
 *
 */
var events = require('events');

function Stream() {
    events.EventEmitter.call(this);
}
util.inherits(Stream, events,EventEmitter);
