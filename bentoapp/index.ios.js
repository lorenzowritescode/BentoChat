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
var Login = require('./Login');

var ChatPane = require("./ChatPane.js");

var BentoApp = React.createClass({
    statics: {
        title: "<TabBarIOS>",
        description: "this is a tab bar lol",
    },
    displayName: 'ChatPane',
    getInitialState: function() {
        return {
            selectedTab: 'chatTab',
            jwt: null
        };
    },
    _isLoggedIn () {
        return true;
        return this.state.jwt !== null;
    },
    _renderContent: function(color, pageText) {
        return (
            <View style={[styles.tabContent, {backgroundColor: color}]}>
                <Text style={styles.tabText}>{pageText}</Text>
            </View>
        );
    },
    _setJwt: function (jwt) {
        this.setState({
            jwt: jwt
        });
    },
    render: function() {
        if (!this._isLoggedIn()) {
            return <Login onSuccess={this._setJwt}/>
        }
        return (
            <TabBarIOS
                tintColor="#0D47A1"
                barTintColor="#BBDEFB"
                translucent={true}>
                <TabBarIOS.Item
                    systemIcon="contacts"
                    selected={this.state.selectedTab === 'chatTab'}
                    onPress={() => {
                        this.setState({
                            selectedTab: 'chatTab',
                        });
                    }}>
                    <ChatPane/>
                </TabBarIOS.Item>
                <TabBarIOS.Item
                    title="Wiki"
                    selected={this.state.selectedTab === 'wikiTab'}
                    onPress={() => {
                        this.setState({
                            selectedTab: 'wikiTab',
                        });
                    }}>
                    {this._renderContent("#BADA55", "Wiki Tab")}
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

AppRegistry.registerComponent('bentoapp', () => BentoApp);
