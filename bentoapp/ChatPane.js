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
        flex: 1,
        flexDirection: 'column',
    },
    chatList: {
        height: 400,
    },
    textInput: {
        //height: 20,
        margin: 20,
        padding: 10,
        width: 375 - 50,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 5,
    },
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
            focus: false,
        };
    },
    render: function() {
        var flexVals = {
            chatList: 0.9,
            textInput: 0.05,
            paddingView: 0.15
        };

        if (this.state.focus) {
            flexVals = {
                chatList: 0.4,
                textInput: 0.05,
                paddingView: 0.55
            };
        }

        return (
            <View style={styles.containerStyle}>
                <ChatList style={[styles.chatList, {flex: flexVals["chatList"]}]} messageList={Messages} loaded={this.state.loaded}/>
                <TextInput
                    ref={component => this._textInput = component}
                    style={[styles.textInput, {flex: flexVals["textInput"]}]}
                    returnKeyType='send'
                    onSubmitEditing={this.submitMessage}
                    onChangeText={(text) => this.setState({inputText: text})}
                    onFocus={() => this.setState({focus: true})}
                    onBlur={() => this.setState({focus: false})}
                    placeholder={'Enter a message'}
                />
                <View style={{flex: flexVals["paddingView"]}}/>
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
