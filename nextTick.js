#!/usr/bin/env node
/**
 * @file nextTick.js
 *
 * @breif Use `nextTick' to trigger an async procedure
 *
 */
process.nextTick(function() {
    console.log('delayed execution');
});
console.log('normal execution');
