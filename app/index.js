'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');


var AppengineGenerator = module.exports = function AppengineGenerator(args, options, config) {
  yeoman.generators.Base.apply(this, arguments);
  this.args = args;
  this.pkg = JSON.parse(this.readFileAsString(path.join(__dirname, '../package.json')));
};

util.inherits(AppengineGenerator, yeoman.generators.Base);

AppengineGenerator.prototype.askFor = function askFor() {
  var cb = this.async();

  this.appId = this.args[0] || undefined;

  var prompts = [];

  if (this.args[0] === undefined) {
    prompts.push({
      name: 'appId',
      message: 'What is the application ID?',
      default: 'new-application'
    })
  } else {
    this.appId = this.args[0];
  }

  this.prompt(prompts, function (props) {
    for (var prop in props) {
      this[prop] = props[prop];
    }

    cb();
  }.bind(this));
};

AppengineGenerator.prototype.projectfiles = function projectfiles() {
  this.copy('editorconfig', '.editorconfig');
};

AppengineGenerator.prototype.AppEngineFiles = function AppEngineFiles() {
  this.template('app.yaml');
  this.copy('index.yaml');
};

AppengineGenerator.prototype.StaticFiles = function StaticFiles() {
  this.mkdir('assets');
  this.directory('assets');
};
