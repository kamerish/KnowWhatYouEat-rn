import React from 'react'
import { View, Text, StyleSheet, Button } from 'react-native'
import { connect } from 'react-redux'

import Navi from '../navigation/DrawerNavigator';
import { NavigationContainer } from '@react-navigation/native';
class Profile extends React.Component {
	render() {
		return (
		<NavigationContainer >
			<Navi />
		</NavigationContainer>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center'
	}
})

const mapStateToProps = state => {
	return {
		user: state.user
	}
}
const mapDispatchToProps = dispatch => {
	return bindActionCreators({ updateEmail, updatePassword, login, getUser ,googleupdate }, dispatch)
}

export default connect(mapStateToProps)(Profile)
