import React from 'react'
import {Text,View,Button,StyleSheet} from 'react-native';


export default function Login({navigation}){
    return(
        <View style={styles.container}>
            <Text>This is Login Screen</Text>
            <Button title="Click to go to home" onPress={()=> navigation.navigate('Home')}></Button>
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
  