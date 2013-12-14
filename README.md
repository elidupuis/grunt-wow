# grunt-wow

> Increase developer morale. Show a random (cheeky|funny|wise|motivational) message in the terminal.

The list of messages to choose from is configurable and can be either a simple array of strings or a local or remote file path. If you are using a file, each message should be placed on it's own line.

## Getting Started
This plugin requires Grunt `~0.4.2`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-wow --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-wow');
```

## The "wow" task

### Overview
In your project's Gruntfile, add a section named `wow` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  wow: {
    your_target: {
      source: ['you are amazing.', 'damn! you got game.', 'better luck next time.']
    },
  },
});
```

```js
grunt.initConfig({
  wow: {
    your_target: {
      source: 'http://f.cl.ly/items/2F1X430I0v0V0F1q0D1m/sayings.txt'
    },
  },
});
```

### Options

#### options.source
Type: `Array` or `String`
Default value: `null`

Either a simple array of strings or a path to a text file (will be split on line breaks).

### Usage Examples

Protip: Use a published Google Spreadsheet (CSV) so your entire team can add or remove messages at any time!

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Inspiration

Inspired by:

- [https://github.com/iammerrick/grunt-compliment](grunt-compliment)
- [https://github.com/jaredstehler/grunt-wisdom](grunt-wisdom)

## Release History

- 2013-12-12   v0.1.2   Initial release (npm noob, messed up SEM)
