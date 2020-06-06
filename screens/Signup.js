import React from 'react'
import { View, TextInput, StyleSheet, TouchableOpacity, Text} from 'react-native'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { updateEmail, updatePassword, signup } from '../actions/user'

class Signup extends React.Component {
	handleSignUp = () => {
		this.props.signup()
		this.props.navigation.navigate('Profile')
	}
	render() {
		return (
			<View style={{flex:1,backgroundColor:"white"}}>
			<View style={{justifyContent:"center",alignSelf:"center",}}>
					<Text style={{fontSize:30,color:"#14213D",margin:20}}>Sign up</Text>
				</View>
			<View style={styles.container}>
				<TextInput
					style={styles.inputBox}
					value={this.props.user.email}
					onChangeText={email => this.props.updateEmail(email)}
					placeholder='Email'
					autoCapitalize='none'
				/>
				<TextInput
					style={styles.inputBox}
					value={this.props.user.password}
					onChangeText={password => this.props.updatePassword(password)}
					placeholder='Password'
					secureTextEntry={true}
				/>
				<TouchableOpacity style={styles.button} onPress={this.handleSignUp}>
					<Text style={styles.buttonText}>Signup</Text>
				</TouchableOpacity>
			</View>
		</View>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center'
	},
	inputBox: {
		width: 300,
		margin: 5,
		padding: 10,
		fontSize: 16,
		borderColor: '#d3d3d3',
		borderWidth: 1,
		borderRadius:30,
		textAlign: 'center'
	},
	button: {
		marginTop: 30,
		marginBottom: 20,
		marginRight:30,
		paddingVertical: 5,
		backgroundColor: '#D90429',
		borderRadius: 20,
		justifyContent:"flex-end",
		alignSelf:"flex-end"
		
	},
	buttonText: {
		fontSize: 20,
		paddingVertical:2,
		paddingHorizontal:15,
		color: '#fff'
	},
	buttonSignup: {
		fontSize: 12
	}
})

const mapDispatchToProps = dispatch => {
	return bindActionCreators({ updateEmail, updatePassword, signup }, dispatch)
}

const mapStateToProps = state => {
	return {
		user: state.user
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Signup)
