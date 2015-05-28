'use strict';

describe('WikiEditor', function () {
  var React = require('react/addons');
  var WikiEditor, component;

  beforeEach(function () {
    WikiEditor = require('components/WikiEditor.js');
    component = React.createElement(WikiEditor);
  });

  it('should create a new instance of WikiEditor', function () {
    expect(component).toBeDefined();
  });
});
