'use strict';

var React = require('react-native');
var {
    StyleSheet,
    TextInput,
    Text,
    Image,
    View,
} = React;

var ChatList = require('./ChatList.js');

var styles = StyleSheet.create({
    containerStyle: {
        //flex: 1,
        //flexDirection: 'column',
    },
    chatList: {
        flex: 0.8,
    },
    textInput: {
        flex: 0.2,
        height: 20,
        width: 375,
        marginBottom: 40,
        borderColor: 'gray',
        borderWidth: 1,
    }
});

var ChatPane = React.createClass({
    displayName: "ChatPane",
    getInitialState: function() {
        return {
            inputText: "",
        };
    },
    render: function() {
        return (
            <View style={styles.containerStyle}>
                <ChatList style={styles.chatList}/>
                <TextInput
                    style={styles.textInput}
                    onChangeText={(text) => this.setState({inputText: text})}
                />
            </View>
        );
    }
});

module.exports = ChatPane
