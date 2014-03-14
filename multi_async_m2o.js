#!/usr/bin/env node
/**
 * @file multi_async_m2o.js
 *
 * @breif Handle the many-to-one situation with the publish/subscribe mode.
 *
 * @note pseudo-codes, cannot run
 *
 */
// sentinels
var count = 0;
var results = {};
var done = function(key, value) {
    results[key] = value;
    count++;
    if (count === 3) {
        render();
    }
};

fs.readFile(template_path, 'utf8', function(err, template) {
    done('template', template);
});
db.query(sql, function(err, data) {
    done('data', data);
};
l10n.get(function(err, resources) {
    done('resources', resources);
});
