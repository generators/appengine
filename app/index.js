'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');


var AppengineGenerator = module.exports = function AppengineGenerator(args, options, config) {
  yeoman.generators.Base.apply(this, arguments);

  this.pkg = JSON.parse(this.readFileAsString(path.join(__dirname, '../package.json')));
};

util.inherits(AppengineGenerator, yeoman.generators.Base);

AppengineGenerator.prototype.askFor = function askFor() {
  var cb = this.async();

  // have Yeoman greet the user.
  console.log(this.yeoman);

  var prompts = [{
    name: 'appId',
    message: 'What is the application ID?',
    default: 'new-application'
  }];

  this.prompt(prompts, function (props) {
    this.appId = props.appId;

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
  this.copy('assets/favicon.ico');
  this.copy('assets/robots.txt');
};
