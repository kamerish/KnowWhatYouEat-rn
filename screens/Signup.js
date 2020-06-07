import React from 'react'
import { View, TextInput, StyleSheet, TouchableOpacity, Text, ToastAndroid, Alert,ScrollView} from 'react-native'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { updateEmail, updatePassword, signup, updateName } from '../actions/user'
import LinearGradient from 'react-native-linear-gradient';

class Signup extends React.Component {
	state={
		name: "",
		namevalidated : false,
		emailvalidated : false,
		passvalidated : false,
		email: "",
		pass: "",
		user: this.props.user,
	}
	
	showToast = (value) => {
		ToastAndroid.show(value + " !", ToastAndroid.SHORT);
	};

	validateName = (name) => {
		if (name.length == 0){
			this.showToast("Please Enter Name")
		}
		
		else if (name.match(/(\d+)/)){
			this.showToast("Name cannot contain numbers")
		}
		else{
			this.setState({namevalidated:true})
			this.props.updateName(name)
		}
	}
	validateEmail = (email) => {
		var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
		if (email.length == 0){
			this.showToast("Please Enter your email")
		}
		else if (reg.test(email) == false){
			this.showToast("Invalid Email")
		}
		else{
			this.showToast("Done")
			this.setState({emailvalidated:true})
			this.props.updateEmail(email)
		}
	}
	validatePass = (pass) => {
		if (pass.length == 0){
			this.showToast("Please Enter Your password")
		}
		else if (pass.length<8){
			this.showToast("Your Password should be atleast 8 character's long")
		}
		else{
			this.showToast("Done")
			this.setState({passvalidated:true})
			this.props.updatePassword(pass)
		}
	}

	handleSignUp = () => {
		console.log(this.state.passvalidated , this.state.emailvalidated , this.state.namevalidated)
		if(this.state.passvalidated && this.state.emailvalidated && this.state.namevalidated){
			try{
				this.showToast("SigninComplete")
				this.props.signup()
			}
			catch(e){
				Alert(e)
			}
		} 
		else{
			this.showToast("Please Enter All the Required Fields")
		}
		
	}
	render() {
		return (
			<LinearGradient 
			start={{x: 0, y: 0.25}}
        end={{x: 1.5, y: 1}}
		locations={[0, 0.5, 0.7]}
		style={{flex:1}}
        colors={['#FFA69E','#AED9E0' ]}>
			<View style={{flex:1,justifyContent:"flex-end",}}>
				<View style={{justifyContent:"center",alignSelf:"center",}}>
					<Text style={styles.signupfont}>Sign up</Text>
				</View>
			<ScrollView style={styles.container}    contentContainerStyle={styles.scrollstyle}>
			<TextInput
					style={styles.inputBox}
					value={this.state.name}
					onChangeText={name => this.setState({name:name,namevalidated:false})}
					onBlur={()=>this.validateName(this.state.name)}
					keyboardType="twitter"
					placeholder='Name'
					autoCapitalize='none'
				/>
				<TextInput
					style={styles.inputBox}
					value={this.state.email}
					onChangeText={email => this.setState({email:email,emailvalidated:false})}
					placeholder='Email'
					autoCorrect={false}
					autoCompleteType={"off"}
					keyboardType="email-address"
					onBlur={()=>this.validateEmail(this.state.email)}
					autoCapitalize='none'
				/>
				<TextInput
					style={styles.inputBox}
					value={this.state.password}
					onChangeText={password => this.setState({pass:password,passvalidated:false})}
					placeholder='Password'
					keyboardType="email-address"
					onBlur={()=>this.validatePass(this.state.pass)}
					secureTextEntry={true}
				/>
				<TouchableOpacity style={styles.button} onPress={this.handleSignUp}>
					<Text style={styles.buttonText}>Signup</Text>
				</TouchableOpacity>
			</ScrollView>
		</View>
		</LinearGradient>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 3,
		marginTop:180,
	},
	scrollstyle:{
		alignItems: 'center',
		justifyContent: 'center'
	},
	signupfont:{
		fontSize:30,
		color:"#14213D",
		margin:20,
	},
	inputBox: {
		width: 300,
		margin: 5,
		padding: 10,
		fontSize: 16,
		borderColor: '#4c8bf5',
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
	return bindActionCreators({ updateEmail, updatePassword, signup, updateName}, dispatch)
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
