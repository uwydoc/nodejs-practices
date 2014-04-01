#!/usr/bin/env node
/**
 * @file Promise_Deferred.js
 *
 * @breif Nasty implementation of the Promise/Deferred mode
 */
var EventEmitter = require('events').EventEmitter;
var util = require('util');

// Promise object
var Promise = function() {
  EventEmitter.call(this);
};
util.inherits(Promise, EventEmitter);

Promise.prototype.then = function(fulfilledHandler, errorHandler,
    progressHandler) {
  if (typeof fulfilledHandler === 'function') {
    this.once('success', fulfilledHandler);
  }
  if (typeof errorHandler === 'function') {
    this.once('error', errorHandler);
  }
  if (typeof progressHandler === 'function') {
    this.on('progress', progressHandler);
  }
  // return `this` to achieve chain invoking
  return this;
}

// Deferred object
var Deferred = function() {
  this.state = 'unfulfilled';
  this.promise = new Promise();
};

Deferred.prototype.resolve = function(obj) {
  this.state = 'fulfilled';
  this.promise.emit('success', obj);
};

Deferred.prototype.reject = function(err) {
  this.state = 'error';
  this.promise.emit('error', err);
};

Deferred.prototype.progress = function(data) {
  this.promise.emit('progress', data);
};
