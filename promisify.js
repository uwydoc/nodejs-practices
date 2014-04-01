#!/usr/bin/env node
/**
 * @file promisify.js
 *
 * @breif Simple Promise/Deferred wrapper for http.Response object
 */
// Original codes
res.setEncoding('utf8');
res.on('data', function(chunk) {
  console.log('BODY: ' + chunk);
});
res.on('end', function() {
  // Done
});
res.on('error', function(err) {
  // Error
});

// Promise/Deferred wrapper
var promisify = function(res) {
  var deferred = new Deferred();
  var result = '';
  res.on('data', function(chunk) {
    result += chunk;
    deferred.progress(chunk);
  });
  res.on('end', function() {
    deferred.resolve(result);
  });
  res.on('error', function(err) {
    deferred.reject(err);
  });
  return deferred.promise;
};

// New codes using Promise/Deferred wrapper
promisify(res).then(function() {
  // Done
}, function(err) {
  // Error
}, function(chunk) {
  // Progress
  console.log('BODY: ' + chunk);
});
