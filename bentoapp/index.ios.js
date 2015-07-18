/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

var React = require('react-native');
var {
  AppRegistry,
  StyleSheet,
  TabBarIOS,
  Text,
  View,
} = React;

var TabBar = React.createClass({
    statics: {
        title: "<TabBarIOS>',
        description: "this is a tab bar lol",
    },
    displayName: 'TabBarExample',
    getInitialState: function() {
        return {
            selectedTab: 'chatTab',
            notifCount: 0,
            presses: 0,
        };
    },
    _renderContent: function(color, pageText) {
        return (
            <View style={[syles.tabContent, {backgroundColor: color}]}>
                <Text style={styles.tabText}>{pageText}</Text>
                <Text style={styles.tabText}>{this.state.presses}</Text>
            </View>
        );
    },
    render: function() {
        return (
            <TabBarIOS
                tintColor="black"
                barTintColor="#3abeff">
                <TabBarIOS.Item
                    title="Chat"
                    selected={this.state.selectedTab == 'chatTab'}
                    onPress{() => {
                        this.setState({
                            selectedTab: 'chatTab',
                        });
                    }}>
                    {this._renderContent("#414A8C", "Blue Tab")}
                </TabBarIOS.Item>
            </TabBarIOS>
        );
    }
});


var styles = StyleSheet.create({
  tabContent: {
    flex: 1,
    alignItems: 'center',
  },
  tabText: {
    color: 'white',
    margin: 50,
  },
});

var bentoapp = React.createClass({
  render: function() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Welcome to React Native!
        </Text>
        <Text style={styles.instructions}>
          To get started, suck my dick
        </Text>
        <Text style={styles.instructions}>
          Press Cmd+R to reload,{'\n'}
          Cmd+D or shake for dev menu
        </Text>
      </View>
    );
  }
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('bentoapp', () => bentoapp);
