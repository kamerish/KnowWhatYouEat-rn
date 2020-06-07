import React from 'react'
import BottomTab from '../../navigation/BottomTabNavigator';
import {View,Text,TouchableOpacity,Image,Button, StatusBar} from 'react-native'
import {Appbar} from 'react-native-paper';
import {DrawerActions} from '@react-navigation/drawer'
import { useNavigation } from '@react-navigation/native';

const themecolour = "#A8DADC"

function Rendermycustomappbar(props){
    
    return(
        <View style={{flexDirection:"row",alignItems:"center",alignSelf:"center",flex:1,margin:5,}}> 
            <TouchableOpacity style={{paddingLeft:10,}} onPress={()=>props.openDrawer()}>
                <Image source={require('../../assets/icons/menu.png')} style={{height:20,width:20,padding:12}}></Image>
            </TouchableOpacity>
            <View style={{flex:1,alignSelf:"center",alignContent:"center",alignItems:"center",}}>
                <Text style={{fontSize:22,color:"#F4F9E9"}}>KnowWhatYouEat</Text>
            </View>
            <TouchableOpacity >
                <View  style={{height:20,width:20,padding:12}}></View>
            </TouchableOpacity>
        </View>
    )
}

export default function Dtab1({navigation}){
   // const navigation = useNavigation();
    return(
        <>
        <StatusBar backgroundColor={themecolour} />
        <View>
        <Appbar children={<Rendermycustomappbar {...navigation}/>}  style={{backgroundColor:themecolour,height:50}}/>
        </View>
            <BottomTab />
        </>
    )
}


 


