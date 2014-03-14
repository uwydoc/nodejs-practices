#!/usr/bin/env node
/**
 * @file multi_async_m2m.js
 *
 * @breif Handle the many-to-many situation with the publish/subscribe mode,
 *        with partial function applied.
 *
 * @note pseudo-codes, cannot run
 *
 */
var events = require('events');

var after = function(times, callback) {
    var count = 0, results = {};
    return function(key, value) {
        results[key] = value;
        count++;
        if (count === times) {
            callback();
        }
    };
};

vr emitter = new events.Emitter();
var done = after(3, render);

emitter.on('done', done);
emitter.on('done', other);

fs.readFile(template_path, 'utf8', function(err, template) {
    emitter.emit('done', 'template', template);
});
db.query(sql, function(err, data) {
    emitter.emit('done', 'data', data);
});
l10n.get(function(err, resources) {
    emitter.emit('done', 'resources', resources');
});
