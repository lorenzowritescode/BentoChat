'use strict';

describe('WikiViewer', function () {
  var React = require('react/addons');
  var WikiViewer, component;

  beforeEach(function () {
    WikiViewer = require('components/WikiViewer.js');
    component = React.createElement(WikiViewer);
  });

  it('should create a new instance of WikiViewer', function () {
    expect(component).toBeDefined();
  });
});
