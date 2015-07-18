'use strict';

var React = require('react-native');
var {
    StyleSheet,
    ListView,
    Text,
    Image,
    View,
} = React;

var styles = StyleSheet.create({
    cellContainer: {
        paddingTop: 5,
        paddingBottom: 5,
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    cellRightContainer: {
        flex: 1,
        marginLeft: 6,
        marginVertical: 10,
    },
    cellAvatar: {
        margin: 6,
        marginLeft: 12,
        width: 40,
        height: 40,
        borderRadius: 20,
    },
    cellName: {
        fontSize: 11,
        color: "gray",
        marginTop: 5,
    },
    cellMessage: {
        fontSize: 14,
        color: "black",
    },
    loadingView: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
});
var PersonCell = React.createClass({
    displayName: "PersonCell",
    render: function() {
        var avatar = "http://api.adorable.io/avatar/50/" + this.props.name.split(" ")[0]
        return (
            <View style={styles.cellContainer}>
                <Image style={styles.cellAvatar}
                        source={{uri: avatar}}/>
                <View style={styles.cellRightContainer}>
                    <Text style={styles.cellMessage}>{this.props.message}</Text>
                    <Text style={styles.cellName}>{this.props.name}</Text>
                </View>
            </View>
        );
    }
});

var ChatList = React.createClass({
    statics: {
        title: "<ChatList>",
        description: "this is a chat pane lol"
    },
    displayName: "ChatList",
    getInitialState: function() {
        return {
            peopleDS: new ListView.DataSource({
                rowHasChanged: (r1, r2) => r1 !== r2,
            }),
        };
    },
    render: function() {
        if (!this.props.loaded) {
            return (
                <View style={styles.loadingView}>
                    <Text>Loading...</Text>
                </View>
            );
        }

        var messagesDataSource = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 !== r2,
        });
            console.log(this.props.messageList);
        messagesDataSource = messagesDataSource.cloneWithRows(this.props.messageList)

        return (
            <View style={this.props.style}>
                <ListView
                    dataSource={messagesDataSource}
                    renderRow={(message) => {
                        return (
                            <PersonCell
                                name={message.name}
                                avatar={message.avatar}
                                message={message.message}
                            />
                        );
                    }}
                    style={styles.peopleList}
                />
            </View>
        );
    },
});

module.exports = ChatList
