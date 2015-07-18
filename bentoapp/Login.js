const React = require('react-native'),
    Button = require('react-native-button'),
    login = require('./APIUtils').login;

const {
    AppRegistry,
    StyleSheet,
    TabBarIOS,
    Text,
    View,
    TextInput,
    TouchableHighlight
    } = React;

var styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10
    },
    input: {
        height: 40,
        borderColor: 'gainsboro',
        borderWidth: 1,
        borderRadius: 5,
        paddingLeft: 10,
        marginBottom: 10,
    },
    title: {
        marginBottom: 50,
        justifyContent: 'center',
        fontSize: 25,
        fontWeight: 'bold',
    },
    button: {
        width: 200,
        height: 50,
        margin: 20,
        borderWidth: 1,
        borderRadius: 10,
        paddingTop: 14,
    },
});

const Login = React.createClass({
    componentDidMount: function () {
        this.setState({
            email: '',
            pwd: '',
            errorMessage: ''
        });
    },
    render: function () {
        //var error = this.state.errorMessage,
        //    ErrorBox;
        //if (error !== '') {
        //    ErrorBox = (
        //        <View style={styles.error}>
        //            <Text>{this.state.errorMessage}</Text>
        //        </View>
        //    );
        //} else {
        //    ErrorBox = <View />;
        //}

        return (
            <View style={styles.container}>
                <Text style={styles.title}>Welcome to Bento</Text>
                <TextInput
                    ref="email"
                    clearButtonMode="while-editing"
                    placeholder="email"
                    onChangeText={(text) => { this.setState({email: text}); }}
                    style={styles.input}/>
                <TextInput
                    ref="password"
                    clearButtonMode="while-editing"
                    placeholder="password"
                    secureTextEntry={true}
                    onChangeText={(text) => { this.setState({pwd: text}); }}
                    style={styles.input}/>
                <Button
                    style={styles.button}
                    onPress={this.buttonClicked}>
                    Log in
                </Button>
            </View>
        );
    },
    buttonClicked: function () {
        var email = this.state.email,
            pwd = this.state.pwd;

        console.log(email, pwd);

        login(email, pwd)
            .then((jwt) => {
                console.log('BITCHHHH', jwt);
                this.props.onSuccess(jwt);
            })
            .catch((error) => {
                this.setState({
                    errorMessage: error.message
                });
            })
    }
});

module.exports = Login;
