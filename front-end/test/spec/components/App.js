'use strict';

describe('App', function () {
  var React = require('react/addons');
  var App, component;

  beforeEach(function () {
    App = require('components/App.js');
    component = React.createElement(App);
  });

  it('should create a new instance of App', function () {
    expect(component).toBeDefined();
  });
});
