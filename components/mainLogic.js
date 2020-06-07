import React, { useState } from 'react';
import {View,Text,StyleSheet,ScrollView} from 'react-native';
import {Card,Overlay} from 'react-native-elements';
import functionclass from '../FoodAdditives/AdditiveFunctions.json';


export default function MyCustomcard(props){
    const [v,nv]  = useState(true)
    console.log(props.strvalue.length,"props")
    return(
      props.strvalue.length==0 && props.caller=="scanner" && props.count==true ?
      (
        <View style={styles.message}>
          <Text style={styles.messagetext}>{`The  Image  Does  Not  Have  Chemical Numbers`}</Text>
        </View>
      ):
      <View style={styles.scrollstyle} >
        {
            props.strvalue.map((it) => {
              let value = it["Function"].split(",")
              return (
                <Card title={it["eNumber"]} titleStyle={{fontSize:22}} key={it["eNumber"]} containerStyle={styles.card} dividerStyle={{backgroundColor:"black",borderWidth:1}}>
                    <Text style={styles.additivenamestyle}>{it.additiveName}</Text>
                    <View style={{padding:5}}>
                      {
                    value.map((its)=>{
                      console.log(its)
                      let value = functionclass.items.find((x)=>x["class"] == its.trim())
                      return(
                      value?<>
                      <Text>
                        <Text style={{fontSize:18,}}>Class: </Text>
                        <Text style={{fontSize:16}}>{value.class}</Text>
                        </Text>
                      <Text>
                        <Text style={{fontSize:18}}>Function: </Text>
                        <Text style={{fontSize:16}}>{value.function}</Text>
                        </Text>
                      </>:
                      <>
                      <Text>
                        <Text style={{fontSize:18,}}>Class: </Text>
                        <Text style={{fontSize:16}}>{its}</Text>
                      </Text>
                      
                      </>
                      )
                    })
                  }
                    </View>
                </Card>
              )
            })
            }      
      </View>
    )
  }
  

  const styles = StyleSheet.create({
    message:{
      flex:1,
      marginTop:250,
      justifyContent:"center",
      alignContent:"center",
      alignItems:"center",
      fontSize:16,
      color:"grey",
    },
    messagetext:{
      color:"grey",
      fontSize:16,
    },
    card:{
      borderRadius:7,
      width:"100%",
      padding:20,
      elevation:5,
      backgroundColor:"white",
      marginVertical:10
     },
     cardtitle:{

     },
     additivenamestyle:{
      fontSize:22,
      fontWeight:"bold",
      color:"#247BA0",
      alignSelf:"flex-end",
      marginBottom:10,
     },
     scrollstyle:{
      padding:10,
      flex:1,
      marginHorizontal:30,
      paddingBottom:30,
      justifyContent:"space-around",
      alignItems:"center",
     },
  })
