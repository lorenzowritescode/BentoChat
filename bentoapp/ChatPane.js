'use strict';

var TimerMixin = require('react-timer-mixin');
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
        //flexDirection: 'column',
    },
    chatList: {
        flex: 1,
    },
    textInput: {
        flex: 0.3,
        height: 20,
        width: 375,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 5,
    }
});

var Messages = [
    {
        name: "Lorenzo Balls",
        message: "How are you so amazingly talented at everything?",
    },
    {
        name: "Steve Jobs",
        message: "Love your apps. Lets talk."
    },
    {
        name: "Olly Alexander",
        message: "Thanks for last night 😉", // winky emoji
    },
    {
        name: "Lorenzo Balls",
        message: "Seriously though everything you touch turns to gold.",
    },
    {
        name: "Steve Jobs",
        message: "How does $440m cash + $230m AAPL sound to you?"
    },
];

var ChatPane = React.createClass({
    mixins: [TimerMixin],
    displayName: "ChatPane",
    getInitialState: function() {
        return {
            inputText: "",
            messagesList: [],
            loaded: false,
        };
    },
    render: function() {
        return (
            <View style={styles.containerStyle}>
                <ChatList style={styles.chatList} messageList={Messages} loaded={this.state.loaded}/>
                <TextInput
                    ref={component => this._textInput = component}
                    style={styles.textInput}
                    returnKeyType='send'
                    onSubmitEditing={this.submitMessage}
                    onChangeText={(text) => this.setState({inputText: text})}
                    placeholder={'Enter a message'}
                />
            </View>
        );
    },
    submitMessage: function() {
        this.state.messagesList.push({
            name: "Alexander Hill",
            message: this.state.inputText
        });
        this.setState({
            inputText: "",
            messageList: this.state.messageList
        });
        this._textInput.setNativeProps({text: ''});
    },
    componentDidMount: function() {
        this.fetchData();
    },
    fetchData: function() {
        // laterz
        this.setTimeout(() => {
            this.setState({
                loaded: true,
                messagesList: Messages,
            });
        }, 0);
    },
});

module.exports = ChatPane
