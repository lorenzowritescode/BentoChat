'use strict';

describe('Profile', function () {
  var React = require('react/addons');
  var Profile, component;

  beforeEach(function () {
    Profile = require('components/Profile.js');
    component = React.createElement(Profile);
  });

  it('should create a new instance of Profile', function () {
    expect(component).toBeDefined();
  });
});
