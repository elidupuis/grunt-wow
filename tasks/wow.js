/*
 * grunt-wow
 * https://github.com/elidupuis/grunt-wow
 *
 * Copyright (c) 2013 Eli Dupuis
 * Licensed under the MIT license.
 */

'use strict';
var request = require('request');
var _ = require('underscore');
var Faker = require('Faker');
var chalk = require('chalk');
var style = chalk.white.bgGreen.bold;

module.exports = function(grunt) {

  function output (msg) {
    var str = new Array(msg.length+3).join(' ');
    grunt.log.writeln();
    grunt.log.writeln(style(str));
    grunt.log.writeln(style([' ', msg, ' '].join('')));
    grunt.log.writeln(style(str));
  }

  function madlib (str) {
    var result = str;
    result = result.replace(/{\s*noun\s*}/i, Faker.random.bs_noun());
    result = result.replace(/{\s*adj\s*}/i, Faker.random.bs_adjective());
    result = result.replace(/{\s*buzz\s*}/i, Faker.random.bs_buzz());
    return result;
  }

  // list should be an array of strings
  function chooseSentence (list) {
    var index = _.random(list.length - 1);
    var sentence = list[index];
    var madlibRequired = /{\s*(?:noun|adj|buzz)\s*}/i.test(sentence);

    if (madlibRequired) {
      sentence = madlib(sentence);
    }

    output(sentence);
  }

  grunt.registerMultiTask('wow', 'Increase developer morale.', function() {
    var done = this.async();
    var options = this.options();

    if (!options.source) {
      grunt.log.error('You must have a source option specified.');
      return false;
    }

    // simple array passed in by user
    // no need to load external file.
    if (_.isArray(options.source)) {
      chooseSentence(options.source);
      done();
      return;
    }

    // fetch external text file
    request(options.source, function (error, response, body) {

      if (response.statusCode !== 200) {
        grunt.log.error('Failed to load source file', options.source);
        return false;
      }

      if (!error && response.statusCode === 200) {
        var sentences = _.compact(body.trim().split('\n'));
        chooseSentence(sentences);

        done(); // finish async
      }
    });

  });

};
