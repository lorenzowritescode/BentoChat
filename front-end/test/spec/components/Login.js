'use strict';

describe('Login', function () {
  var React = require('react/addons');
  var Login, component;

  beforeEach(function () {
    Login = require('components/Login.js');
    component = React.createElement(Login);
  });

  it('should create a new instance of Login', function () {
    expect(component).toBeDefined();
  });
});
