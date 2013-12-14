/*
 * grunt-wow
 * https://github.com/elidupuis/grunt-wow
 *
 * Copyright (c) 2013 Eli Dupuis
 * Licensed under the MIT license.
 */

'use strict';
var fs = require('fs');
var request = require('request');
var _ = require('underscore');
var Faker = require('Faker');
var chalk = require('chalk');
var style = chalk.white.bgGreen.bold;

module.exports = function(grunt) {

  var cache = '.grunt/grunt-wow/choices';

  function output (msg) {
    var str = grunt.util.repeat(msg.length+2, ' ');
    grunt.log.writeln();
    grunt.log.writeln(style(str));
    grunt.log.writeln(style(' ' + msg + ' '));
    grunt.log.writeln(style(str));
  }

  function madlib (str) {
    var result = str;
    result = result.replace(/{\s*noun\s*}/ig, function() {
      return Faker.random.bs_noun();
    });
    result = result.replace(/{\s*adj\s*}/ig, function() {
      return Faker.random.bs_adjective();
    });
    result = result.replace(/{\s*buzz\s*}/ig, function() {
      return Faker.random.bs_buzz();
    });
    result = result.replace(/{\s*num\s*}/ig, function() {
      return Faker.Helpers.randomNumber(1000);
    });
    return result;
  }

  // list should be an array of strings
  function chooseSentence (list) {
    var index = _.random(list.length - 1);
    var sentence = list[index];
    var madlibRequired = /{\s*(?:noun|adj|buzz|num)\s*}/i.test(sentence);

    if (madlibRequired) {
      sentence = madlib(sentence);
    }

    output(sentence);
  }

  function processFile (file, options) {
    return _.compact(file.trim().split(options.delimiter));
  }

  grunt.registerMultiTask('wow', 'Increase developer morale.', function() {
    var done = this.async();
    var options = this.options({
      'delimiter': grunt.util.linefeed,
      'cache': 300
    });

    if (!options.source) {
      grunt.log.error('You must specify a source option.');
      return false;
    }

    // simple array passed in by user. no need to load external file.
    if (grunt.util.kindOf(options.source) === 'array') {
      grunt.verbose.ok('Using array literal passed in as source option.');
      chooseSentence(options.source);
      if (grunt.file.exists(cache)) { grunt.file.delete(cache); }
      done();
      return;
    }

    // check if cache exists
    if (grunt.file.exists(cache)) {
      var stats = fs.statSync(cache);
      var cacheAge = Date.now() - stats.mtime.getTime();
      var useCache = cacheAge/1000 < options.cache;
      grunt.verbose.ok('Cache exists', useCache ? 'and will be used' : 'but is old (' + cacheAge/1000 + ' seconds)');

      if (useCache) {
        var file = grunt.file.read(cache);
        var choices = processFile(file, options);
        chooseSentence(choices);
        done();
        return;
      }
    }

    // fetch external text file
    request(options.source, function (error, response, body) {
      grunt.verbose.ok('Fetching external file', options.source);

      if (error || response.statusCode !== 200) {
        grunt.log.debug('Failed to load source file', options.source);
        return false;
      }

      if (!error && response.statusCode === 200) {
        grunt.verbose.ok('Successfully received external file');
        var sentences = processFile(body, options);
        grunt.file.write(cache, body);
        chooseSentence(sentences);
        done(); // finish async
      }
    });

  });

};
