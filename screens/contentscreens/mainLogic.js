import React from 'react';
import {View,Text,StyleSheet} from 'react-native';
import {Card} from 'react-native-elements';
import functionclass from '../../FoodAdditives/AdditiveFunctions.json';



export default function MyCustomcard(props){
    console.log("THis is new function")
    return(
      <View style={{justifyContent:"space-around",alignItems:"center",padding:10,marginHorizontal:30}}>
        {
            props.strvalue.map((it) => {
              let value = it["Function"].split(",")
              return (
                <Card title={it["eNumber"]} titleStyle={{fontSize:22}} key={it["eNumber"]} containerStyle={styles.card} dividerStyle={{backgroundColor:"black",borderWidth:1}}>
                    <Text style={{fontSize:22,fontWeight:"bold",color:"#1D3557"}}>{it.additiveName}</Text>
                    <View style={{padding:5}}>
                      {
                    value.map((its)=>{
                      console.log(its)
                      let value = functionclass.items.find((x)=>x["class"] == its.trim())
                      return(
                      value?<>
                        <Text >Class: {value.class}</Text>
                        <Text>Fucntion: {value.function}</Text>
                      </>:
                      <>
                        <Text>Class: {it["Function"]}</Text>
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
    card:{
      borderRadius:7,
      width:"100%",
      padding:20,
      elevation:5,
      backgroundColor:"white",
      marginVertical:10
     },
  })