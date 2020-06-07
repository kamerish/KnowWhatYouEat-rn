import React from "react";
import {
	View,
	TextInput,
	StyleSheet,
	TouchableOpacity,
	Text,
	StatusBar,
	ToastAndroid,
} from "react-native";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { updateEmail, updatePassword, login, getUser } from "../actions/user";
import LinearGradient from 'react-native-linear-gradient';

class Login extends React.Component {
	state={
		pass:""
	}
	
	showToast = (value) => {
		ToastAndroid.show(value + " !", ToastAndroid.LONG);
	};

	handlesignin = () => {
		this.showToast("Signing in..Please Wait  ")
		this.props.login()
	}

	render() {
		return (
			<>
			<StatusBar backgroundColor="#D90429"></StatusBar>
			<LinearGradient 
			start={{x: 0, y: 0.25}}
        end={{x: 1.5, y: 1}}
		locations={[0, 0.5, 0.7]}
		style={{flex:1}}
        colors={['#FFA69E','#AED9E0' ]}>
			<View style={{flex:1,}}>
				<View style={styles.topbar}>
					<Text style={{ fontSize: 36, color: "#D90429", marginTop: 10 }}>
						KnowWhatYouEat
          			</Text>
				</View>
				<View style={styles.container}>
					<View>
						<View
							style={{
								margin: 10,
								justifyContent: "center",
								alignSelf: "center",
							}}
						>
							<Text style={{ fontSize: 20, color: "#14213D" }}>Sign in</Text>
						</View>
						<TextInput
							style={styles.inputBox}
							value={this.props.user.email}
							onChangeText={(email) => this.props.updateEmail(email)}
							placeholder="Email"
							autoCapitalize="none"
						/>
						<TextInput
							style={styles.inputBox}
							value={this.state.pass}
							onChangeText={(password) => {
								this.setState({pass:password})
								this.props.updatePassword(password)}}
							placeholder="Password"
							secureTextEntry={true}
						/>
						<TouchableOpacity
							style={styles.button}
							onPress={()=>this.handlesignin()}
						>
							<Text style={styles.buttonText}>Login</Text>
						</TouchableOpacity>
						
					</View>
				</View>
				<View style={styles.bottom}>
					<TouchableOpacity
						style={styles.button2}
						onPress={() => this.props.navigation.navigate("Signup")}
					>
						<Text style={styles.buttonText2}>Don't have an account yet?</Text>
						<Text style={styles.buttonText3}> Sign up</Text>
					</TouchableOpacity>
				</View>
			</View>
			</LinearGradient>
			</>
		);
	}
}

const styles = StyleSheet.create({
	topbar: {
		justifyContent: "center",
		alignSelf: "center",
		
	},
	container: {
		flex: 10,
		alignItems: "center",
		justifyContent: "center",
		
	},
	inputBox: {
		width: 300,
		margin: 5,
		padding: 10,
		fontSize: 16,
		borderColor: "#d3d3d3",
		borderWidth: 1,
		borderRadius: 30,
		textAlign: "center",
	},
	button: {
		marginTop: 30,
		marginBottom: 20,
		paddingVertical: 5,
		backgroundColor: "#D90429",
		borderRadius: 20,
		justifyContent: "flex-end",
		alignSelf: "flex-end",
	},
	buttonText: {
		fontSize: 20,
		paddingVertical: 2,
		paddingHorizontal: 15,
		color: "#fff",
	},
	button2: {
		paddingVertical: 5,
		paddingHorizontal: 10,
		alignItems: "center",
		borderRadius: 5,
		borderRadius: 20,
		flexDirection: "row",
		alignSelf: "center",
	},
	buttonText2: {
		fontSize: 18,
		color: "black",
	},
	buttonText3: {
		fontSize: 22,
		color: "black",
		fontWeight: "bold",
	},
	bottom: {
		flex: 1,
		justifyContent: "center",
	},
});

const mapDispatchToProps = (dispatch) => {
	return bindActionCreators(
		{ updateEmail, updatePassword, login, getUser},
		dispatch
	);
};

const mapStateToProps = (state) => {
	return {
		user: state.user,
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
