import React from 'react'
import { View, Text, StyleSheet, Button } from 'react-native'
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



export default Profile
