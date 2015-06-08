'use strict';

describe('ChatSide', function () {
  var React = require('react/addons');
  var ChatSide, component;

  beforeEach(function () {
    ChatSide = require('components/ChatSide.js');
    component = React.createElement(ChatSide);
  });

  it('should create a new instance of ChatSide', function () {
    expect(component).toBeDefined();
  });
});
