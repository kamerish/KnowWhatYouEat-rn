import React from 'react';
import {View, Text, StyleSheet,TouchableOpacity} from 'react-native';
import {
  createDrawerNavigator,
  DrawerItem,
  DrawerItemList,
  DrawerContentScrollView,
} from '@react-navigation/drawer';
import Dtab1 from '../screens/contentscreens/Dtab1';
import {Divider} from 'react-native-paper'
import LinearGradient from 'react-native-linear-gradient'

const Drawer = createDrawerNavigator();

function MycustomDrawer(props) {
  return (
    <View style={styles.container}>
      <LinearGradient
        start={{x: 0.001, y: 0.1}}
        end={{x: 0.002, y: 2.5}}
        locations={[0, 0.5]}
        colors={['#A8DADC','#E63946']}
        style={styles.linearGradient}>
            <Text style={styles.titletext}>KnowWhatYouEat</Text>
            <Divider style={{borderWidth:StyleSheet.hairlineWidth,width:"85%",alignSelf:"center"}}/>
            <DrawerItemList {...props} labelStyle={{marginVertical:5,marginLeft:10,fontSize:16}} />
            <TouchableOpacity>

            </TouchableOpacity>
            <View style={{justifyContent:"flex-end",flex:1,margin:10}}>
              
              <Text style={{fontSize:12,color:"white"}}> 
                <Text>Developed By </Text>
                <Text style={{fontSize:16}}>Kamerish A</Text>
              </Text>
            </View>
      </LinearGradient>
    </View>    
  );
}

/*

<LinearGradient
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}
        colors={['blue', 'orange']}
        style={styles.linearGradient}>

<LinerGradient />

*/

export default function Drawernavi() {
  return (
    <Drawer.Navigator
      drawerType={'back'}
      drawerContent={(props) => <MycustomDrawer {...props} />}
      drawerStyle={{justifyContent: 'space-around'}} 
      edgeWidth={50}>
      <Drawer.Screen
        name="Home"
        component={Dtab1}
      />
      </Drawer.Navigator>

    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F1FAEE',
  },
  titletext:{
    marginTop:30,
    marginBottom:30,
    color:"#E63946",
    fontSize:24,
    alignSelf:"center",
    opacity:0.8
  },
  linearGradient: {
    flex:1,
    opacity:0.9
  },
  buttonText: {
    fontSize: 18,
    fontFamily: 'Gill Sans',
    textAlign: 'center',
    color: '#ffffff',
    backgroundColor: 'transparent',
  },
});
