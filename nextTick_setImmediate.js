#!/usr/bin/env node
/**
 * @file nextTick_setImmediate.js
 *
 * @breif Hybrid process.nextTick and setImmediate
 *
 */
// Add two nextTick callbacks
process.nextTick(function() {
    console.log('nextTick delay exec 1');
});
process.nextTick(function() {
    console.log('nextTick delay exec 2');
});
// add two setImmediate callbacks
setImmediate(function() {
    console.log('setImmediate delay exec 1');
    // !! Invasion !!
    process.nextTick(function() {
        console.log('nextTick invasion!');
    });
});
setImmediate(function() {
    console.log('setImmediate delay exec 2');
});
console.log('normal execution');
