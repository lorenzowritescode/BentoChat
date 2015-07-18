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
        fontSize: 15,
        color: "black",
        marginBottom: 5,
    },
    cellMessage: {
        fontSize: 12,
        color: "gray",
    },

    peopleList: {

    }
});

var People = [
    {
        name: "Lorenzo Balls",
        avatar: "http://api.adorable.io/avatars/50/lorenzo",
        lastMessage: "Lorenzo: How are you so amazingly talented at everything?",
    },
    {
        name: "Steve Jobs",
        avatar: "http://api.adorable.io/avatars/50/stevejobs",
        lastMessage: "You: Yeah I like Tim, but he's not the best presenter."
    }
];

var PersonCell = React.createClass({
    displayName: "PersonCell",
    render: function() {
        return (
            <View style={styles.cellContainer}>
                <Image style={styles.cellAvatar}
                        source={{uri: this.props.avatar}}/>
                <View style={styles.cellRightContainer}>
                    <Text style={styles.cellName}>{this.props.name}</Text>
                    <Text style={styles.cellMessage} numberOfLines={1}>{this.props.lastMessage}</Text>
                </View>
            </View>
        );
    }
});


var ChatPane = React.createClass({
    mixins: [TimerMixin],
    statics: {
        title: "<ChatPane>",
        description: "this is a chat pane lol"
    },
    displayName: "ChatPane",
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
            console.log(People);
            this.setState({
                loaded: true,
                peopleDS: this.state.peopleDS.cloneWithRows(People),
            });
        }, 0);
    },
    render: function() {
        if (!this.state.loaded) {
            return (
                <View style={{textAlign: "center"}}>
                    <Text>Loading...</Text>
                </View>
            );
        }

        return (
            <ListView
                dataSource={this.state.peopleDS}
                renderRow={(person) => {
                    console.log(person);
                    //return <Text>Testing!</Text>;
                    return (
                        <PersonCell
                            name={person.name}
                            avatar={person.avatar}
                            lastMessage={person.lastMessage}
                        />
                    );
                }}
                style={styles.peopleList}
            />
        );
    },
});

module.exports = ChatPane
