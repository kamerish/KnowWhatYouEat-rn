import React from 'react'
import {TransitionPresets,} from '@react-navigation/stack'
import {createMaterialTopTabNavigator, } from '@react-navigation/material-top-tabs'
import {View,Text,Image} from 'react-native'
// ca-app-pub-5995947460101393~9166247961
const BottomTab = createMaterialTopTabNavigator();
import Btab1 from '../screens/contentscreens/Btab1';
import Btab2 from '../screens/contentscreens/Btab2';

const config = {
    stiffness: 500,
    damping: 50,
    mass: 3,
};





export default function Dtab1(){
  return(
  <BottomTab.Navigator 
  swipeEnabled="true" 
  tabBarPosition="top" 
  sceneContainerStyle={{backgroundColor:"#F1FAEE",}} 
  tabBarOptions={{bounces:true,showIcon:true,tabStyle:{backgroundColor:"#E63946",height:50,padding:10 },labelStyle:{textTransform:"none",fontSize:16,margin:0,color:"white"}, pressOpacity:100,pressColor:"black",  }}  >
        <BottomTab.Screen 
        name="Search" 
        component={Btab1} 
        options={{
          title:"Search",
          tabBarIcon:({focused}) => (<Image source={require('../assets/icons/searchbar.png')} style={{height:25,width:25,margin:2}} />) 
          }}/>
        <BottomTab.Screen 
        name="Scan" 
        component={Btab2} 
        options={{
          title:"Scan",
          tabBarIcon:({focused}) => (<Image source={require('../assets/icons/scan.png')} style={{height:25,width:25}} />) 
          }}/>
    </BottomTab.Navigator>
)

}


