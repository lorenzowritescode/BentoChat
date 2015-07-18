'use strict';

var TimerMixin = require('react-timer-mixin');
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

var Messages = [
    {
        name: "Lorenzo Balls",
        avatar: "http://api.adorable.io/avatars/50/lorenzo",
        message: "How are you so amazingly talented at everything?",
    },
    {
        name: "Steve Jobs",
        avatar: "http://api.adorable.io/avatars/50/stevejobs",
        message: "Love your apps. Lets talk."
    },
    {
        name: "Olly Alexander",
        avatar: "http://api.adorable.io/avatars/50/olly",
        message: "Thanks for last night 😉", // winky emoji
    },
];

var PersonCell = React.createClass({
    displayName: "PersonCell",
    render: function() {
        return (
            <View style={styles.cellContainer}>
                <Image style={styles.cellAvatar}
                        source={{uri: this.props.avatar}}/>
                <View style={styles.cellRightContainer}>
                    <Text style={styles.cellMessage}>{this.props.message}</Text>
                    <Text style={styles.cellName}>{this.props.name}</Text>
                </View>
            </View>
        );
    }
});


var ChatList = React.createClass({
    mixins: [TimerMixin],
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
            loaded: false,
        };
    },
    componentDidMount: function() {
        this.fetchData();
    },
    fetchData: function() {
        // laterz
        this.setTimeout(() => {
            this.setState({
                loaded: true,
                peopleDS: this.state.peopleDS.cloneWithRows(Messages),
            });
        }, 0);
    },
    render: function() {
        if (!this.state.loaded) {
            return (
                <View style={styles.loadingView}>
                    <Text>Loading...</Text>
                </View>
            );
        }

        return (
            <View style={this.props.style}>
                <ListView
                    dataSource={this.state.peopleDS}
                    renderRow={(person) => {
                        return (
                            <PersonCell
                                name={person.name}
                                avatar={person.avatar}
                                message={person.message}
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
