'use strict';

describe('BentoNav', function () {
  var React = require('react/addons');
  var BentoNav, component;

  beforeEach(function () {
    BentoNav = require('components/BentoNav.js');
    component = React.createElement(BentoNav);
  });

  it('should create a new instance of BentoNav', function () {
    expect(component).toBeDefined();
  });
});
