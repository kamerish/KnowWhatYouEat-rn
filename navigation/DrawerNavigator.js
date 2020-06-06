import React from "react";
import {View,Text } from 'react-native'
import { createDrawerNavigator, DrawerItem, DrawerItemList, DrawerContentScrollView} from "@react-navigation/drawer";
import Dtab1 from '../screens/contentscreens/Dtab1';
import Dtab2 from '../screens/contentscreens/Dtab2';




const Drawer = createDrawerNavigator();

function MycustomDrawer(props){
  return(
    <DrawerContentScrollView {...props}>
      <DrawerItem 
      label={({ focused, color }) => <View style={{flex:1,}}>
        <Text style={{fontSize:22,color:"#E63946"}}>KnowWhatYouEat</Text>
      </View>}
      />
      <DrawerItemList {...props} />
      
    </DrawerContentScrollView>
  )
}

export default function Drawernavi() {
  return (
    <Drawer.Navigator drawerType={"back"}  drawerContent={props => <MycustomDrawer {...props} />} drawerStyle={{justifyContent:"space-around"}} >
      <Drawer.Screen name="Home" component={Dtab1} options={{drawerLabel:"Home"}}/>
      <Drawer.Screen name="Profile" component={Dtab2} />
    </Drawer.Navigator>
  );
}
