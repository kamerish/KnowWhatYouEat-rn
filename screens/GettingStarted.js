import React from 'react';
import {View,Text,Image, StatusBar} from 'react-native'
import Icon  from 'react-native-vector-icons/MaterialCommunityIcons';
import { TouchableOpacity } from 'react-native-gesture-handler';

class StartScreen extends React.Component{
    render(){
        return(
            <>
            <StatusBar backgroundColor="#4285F4"></StatusBar>
            <View style={{flex:1, backgroundColor:"white" ,justifyContent:"space-around"}}>
                <View style={{backgroundColor:"white",flex:2,margin:50,rotation:90}}>
                    <Image source={require("../assets/imageforwelcome.png")} style={{height:250,width:250}}/>
                </View>
                
                <View style={{backgroundColor:"white",flex:3.5,justifyContent:"space-between"}}>
                    <View style={{flex:1,justifyContent:"center",alignItems:"center"}}>
                        <Text style={{fontSize:36}}>
                            Welcome!
                        </Text>
                        <Text style={{fontSize:26}}>
                            Search for Food Additives
                        </Text>
                    </View>
                    <View style={{backgroundColor:"white",flex:1,justifyContent:"center", alignItems:"center",}}>
                        <TouchableOpacity onPress={()=>this.props.navigation.navigate('Login')} style={{backgroundColor:"#4285F4",borderRadius:30,padding:10 }}>
                            <Image source={require('../assets/icons/forward.png')} style={{height:40,width:40}}></Image>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
            </>
        )
    }
}

export default StartScreen

