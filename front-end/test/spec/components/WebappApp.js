'use strict';

describe('WebappApp', function () {
  var React = require('react/addons');
  var WebappApp, component;

  beforeEach(function () {
    var container = document.createElement('div');
    container.id = 'content';
    document.body.appendChild(container);

    WebappApp = require('components/Chat.js');
    component = React.createElement(WebappApp);
  });

  it('should create a new instance of WebappApp', function () {
    expect(component).toBeDefined();
  });
});
