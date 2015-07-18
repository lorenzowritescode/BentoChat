const React = require('react-native'),
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
        padding: 10
    },
    input: {
        height: 40,
        borderColor: 'gainsboro',
        borderWidth: 1,
        borderRadius: 5,
        paddingLeft: 10
    },
    title: {
        flex: 1,
        justifyContent: 'center',
        fontSize: 25
    },
    button: {
        width: 200,
        height: 50,
        margin: 20,
        backgroundColor: 'green',
        borderRadius: 10
    },
    buttonText: {
        color: 'white'
    }
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
                <Text >Login to Bento</Text>
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
                <TouchableHighlight
                    style={styles.button}
                    onPress={this.buttonClicked}>
                    <Text style={styles.buttonText}>LOGIN</Text>
                </TouchableHighlight>
            </View>
        );
    },
    buttonClicked: function () {
        var email = this.state.email,
            pwd = this.state.pwd;

        console.log(email, pwd);

        login(email, pwd)
            .then((jwt) => {
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