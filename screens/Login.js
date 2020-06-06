import React from "react";
import {
	View,
	TextInput,
	StyleSheet,
	TouchableOpacity,
	Text,
	StatusBar,
	Button,
} from "react-native";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { updateEmail, updatePassword, login, getUser } from "../actions/user";
import Firebase from "../config/Firebase";

class Login extends React.Component {
	render() {
		return (
			<>
			<StatusBar backgroundColor="#D90429"></StatusBar>
			<View style={{flex:1, backgroundColor:"white"}}>
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
							value={this.props.user.password}
							onChangeText={(password) => this.props.updatePassword(password)}
							placeholder="Password"
							secureTextEntry={true}
						/>
						<TouchableOpacity
							style={styles.button}
							onPress={() => this.props.login()}
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
			</>
		);
	}
}

const styles = StyleSheet.create({
	topbar: {
		justifyContent: "center",
		alignSelf: "center",
		backgroundColor: "white",
	},
	container: {
		flex: 10,
		backgroundColor: "#fff",
		alignItems: "center",
		justifyContent: "center",
		backgroundColor: "white",
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
		backgroundColor: "white",
		justifyContent: "center",
	},
});

const mapDispatchToProps = (dispatch) => {
	return bindActionCreators(
		{ updateEmail, updatePassword, login, getUser },
		dispatch
	);
};

const mapStateToProps = (state) => {
	return {
		user: state.user,
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
