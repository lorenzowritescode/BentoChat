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

var ChatPane = require("./Chat.js");

var BentoApp = React.createClass({
    statics: {
        title: "<TabBarIOS>",
        description: "this is a tab bar lol",
    },
    displayName: 'ChatPane',
    getInitialState: function() {
        return {
            selectedTab: 'chatTab',
        };
    },
    _renderContent: function(color, pageText) {
        return (
            <View style={[styles.tabContent, {backgroundColor: color}]}>
                <Text style={styles.tabText}>{pageText}</Text>
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