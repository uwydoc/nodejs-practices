#!/usr/bin/env node
/**
 * @file sequence.js
 *
 * @breif Promise/Deferred mode with sequence property
 */
// Promise
var Promise = function() {
  // callbacks to be invoked
  this.queue = [];
  this.isPromise = true;
};

Promise.prototype.then = function(fulfilledHandler, errorHandler,
    progressHandler) {
  var handler = {};
  if (typeof fulfilledHandler === 'function') {
    handler.fulfilled = fulfilledHandler;
  }
  if (typeof errorHandler === 'function') {
    handler.error = errorHandler;
  }
  this.queue.push(handler);
  return this;
};

// Deferred
var Deferred = function() {
  this.promise = new Promise();
};

Deferred.prototype.resolve = function(obj) {
  var promise = this.promise;
  var handler;
  while (handler = promise.queue.shift()) {
    if (handler && handler.fulfilled) {
      var ret = handler.fulfilled(obj);
      if (ret && ret.isPromise) {
        ret.queue = promise.queue;
        this.promise = ret;
        return;
      }
    }
  }
};

Deferred.prototype.reject = function(err) {
  var promise = this.promise;
  var handler;
  while (handler = promise.queue.shift()) {
    if (handler && handler.error) {
      var ret = handler.error(err);
      if (ret && ret.isPromise) {
        ret.queue = promise.queue;
        this.promise = ret;
        return;
      }
    }
  }
};

Deferred.prototype.callback = function() {
  var that = this;
  return function(err, obj) {
    if (err) {
      return that.reject(err);
    }
    that.resolve(obj);
  };
};

// Promisify any method(smooth)
var smooth = function(method) {
  return function() {
    var deferred = new Deferred();
    var args = Array.prototype.slice.call(arguments, 0);
    args.push(deferred.callback());
    method.apply(null, args);
    return deferred.promise;
  };
};

// Test
var fs = require('fs');

var readFile = smooth(fs.readFile);
readFile('data/file1.txt', 'utf8').then(function(data) {
  return readFile(data.trim(), 'utf8');
}, function(err) {
  throw err;
}).then(function(data) {
  console.log(data);
}, function(err) {
  throw err;
});
