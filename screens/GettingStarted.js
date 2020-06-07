import React from 'react';
import {View,Text,Image, StatusBar} from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler';

class StartScreen extends React.Component{
    render(){
        return(
            <>
            <StatusBar backgroundColor="#4285F4"></StatusBar>
            <View style={{flex:1, backgroundColor:"white" ,justifyContent:"space-around"}}>
                <View style={{backgroundColor:"white",flex:1,margin:50,alignItems:"center"}}>
                    <Image source={require("../assets/tick.png")}  style={{height:50,width:50,}}/>
                </View>
                
                <View style={{backgroundColor:"white",flex:5,justifyContent:"space-between"}}>
                    <View style={{flex:1,justifyContent:"center",alignItems:"center"}}>
                        <Text style={{fontSize:36}}>
                            Welcome!
                        </Text>
                        <Text style={{fontSize:26}}>
                            Search for Food Additives
                        </Text>
                    </View>
                    <View style={{backgroundColor:"white",flex:1,justifyContent:"center", alignItems:"center",}}>
                        <TouchableOpacity onPress={()=>this.props.navigation.navigate('Login')} style={{borderRadius:30,padding:10 }}>
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

