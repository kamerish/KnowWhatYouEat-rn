import React from 'react';
import { View, Button, Text, ActivityIndicator } from 'react-native'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { updateEmail, updatePassword, login, getUser } from '../actions/user'
import {authenication} from '../config/Firebase'


class LoadingScreen extends React.Component {
    componentDidMount = () => {
        
        authenication.onAuthStateChanged(user => {
            if (user) {
                this.props.getUser(user.uid)
                if (this.props.user != null) {
                    this.props.navigation.navigate('Profile')
                }
            }
            else {
                this.props.navigation.navigate('Started')
            }
        })
    }
    render() {
        return (
            <View style={{ flex: 1, justifyContent: "center", alignSelf: "center", alignContent: "center", alignItems: "center" }}>
                <Text style={{ fontSize: 30 }}>Loading !!</Text>
                <ActivityIndicator size="large" />
            </View>
        )
    }
}
const mapDispatchToProps = dispatch => {
    return bindActionCreators({ updateEmail, updatePassword, login, getUser }, dispatch)
}

const mapStateToProps = state => {
    return {
        user: state.user
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(LoadingScreen)
