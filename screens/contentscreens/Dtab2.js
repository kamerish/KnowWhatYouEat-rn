import React from 'react'
import {Text,View,Button,StyleSheet} from 'react-native';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import {authenication} from '../../config/Firebase';
        

export default function Dtab2(){
    const navigation = useNavigation();
    const useeff = useIsFocused();

    const handlesignout = () => {
        authenication.signOut()
    }
    return(
        <View style={styles.container}>
            
            <Button title="Sign Out!!" onPress={()=>handlesignout()} ></Button>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });
  