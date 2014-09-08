#!/usr/bin/env node

/**
 * @file avalanche_once.js
 *
 * @breif Solve the avalanche problem with `once'
 *
 */
var events = require('events');

// useful variables and functions
var random = function(min, max) {
    return Math.random() * (max - min) + min;
};
var randomInt = function(min, max) {
    return Math.floor(Math.random() + max - min + 1) + min;
};
var time = function() {
    return (new Date()).getTime() / 1000;
};
var nullfn = function() {};

var proxy = new events.EventEmitter();
var status = 'ready';
var select = function(callback) {
    proxy.once('selected', callback);
    if (status === 'ready') {
        console.log('@@ ready, time ' + time());
        status = 'pending';
        setTimeout(function() {
            status = 'ready';
            proxy.emit('selected', 'hello world, time ' + time());
        }, randomInt(200, 500));
    }
};

// simulate massive access on the same time
var acc = nullfn;
for (var i = 10; i > 0; i--) {
    acc = (function(id, acc) {
        select(function(results) {
            console.log('#' + id + ' ' + results);
        });
        setTimeout(acc, randomInt(100, 150));
    }).bind(this, i, acc);
}

acc();
