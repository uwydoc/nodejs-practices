#!/usr/bin/env node
/** @file setImmediate.js
 *
 * @breif Use `setImmediate' to trigger an async procedure
 *
 */
setImmediate(function() {
    console.log('delayed execution');
});
console.log('normal execution');
