import React from 'react';
import {Text, View, Button, StyleSheet} from 'react-native';
import {useNavigation, useIsFocused} from '@react-navigation/native';
import {authenication} from '../../config/Firebase';
import LinearGradient from 'react-native-linear-gradient';
import {connect} from 'react-redux';
import {Divider} from 'react-native-paper'



function Dtab2(props) {

  const handlesignout = () => {
    authenication.signOut();
  };

  const handleDelete = () => {
    const data  = authenication.currentUser;
    console.log(data);
    data.delete()
    handlesignout();
  };
  return (
      <LinearGradient
        start={{x: 0, y: 0.25}}
        end={{x: 1.5, y: 1.75}}
        locations={[0, 0.5, 0.7]}
        colors={['#AED9E0', '#FFA69E']}
        style={styles.linearGradient}>
        <View>
            <Text style={styles.buttonText}>Profile</Text>
            <View style={{height:250,justifyContent:"center",alignItems:"center"}}>
              <Divider style={{borderWidth:0.5,width:"90%",}}/>
              <View style={{position:"absolute", height:150,width:150,borderRadius:100,backgroundColor:"white",}}></View>
            </View>
            <View style={{alignItems:"center",justifyContent:"center",marginBottom:100}}>
              <Text>User : {props.user.name}</Text>
              <Text>Email: {props.user.email}</Text>
              <Text>First Logged In : {props.user.firstLoggedIn}</Text>
            </View>
            <View style={{flexDirection:"row",justifyContent:"space-around",alignItems:"center"}}>
            <Button title="Sign Out!!" onPress={() => handlesignout()} ></Button>
            <Button title="Delete Account!!" onPress={() => handleDelete()}></Button>
            </View>
      </View>
      </LinearGradient>
  );
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

export default connect(mapStateToProps)(Dtab2);
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  linearGradient: {
    flex:1,
  },
  buttonText: {
    fontSize: 18,
    fontFamily: 'Gill Sans',
    textAlign: 'center',
    margin: 10,
    color: '#ffffff',
    backgroundColor: 'transparent',
  },
});
