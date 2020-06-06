/* eslint-disable prettier/prettier */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

/* \d{3,4}[a-z]?[(]?[i]?[i]?[i]?[)]?[a-z]?regex for finding enumbers alone */

import React, { Component, useState } from 'react';
import {
  Text,
  PermissionsAndroid,
  Alert,
  ScrollView,
  Image,
  TouchableOpacity,
  View,
  StyleSheet
} from 'react-native';
import vision from '@react-native-firebase/ml-vision';

import ImagePicker from 'react-native-image-picker';
import Mycustomcard from './mainLogic';
import { Button, Overlay, } from 'react-native-elements';

import Data from "../../FoodAdditives/foodAdditiveNumbers.json";




export default function Btab2() {

  const [image, setnewimage] = useState("")
  const [visible, setVisible] = useState(false);
  const [history, sethistory] = useState([]);

  const options = {
    title: 'Select Avatar',
    customButtons: [{ name: 'fb', title: 'Choose Photo from Facebook' }],
    storageOptions: {
      skipBackup: true,
      path: 'images',
    },
  };

  toggleOverlay = () => {
    setVisible(!visible);
  };

  updatehistory = (val) => {
    let obj = history
    if (typeof (obj[0]) != "undefined") {
      if (obj[0].eNumber != val.eNumber) {
        obj.unshift(val)
        sethistory(obj)
      }
      else {
        sethistory(obj)
      }
    }
    else {
      obj.unshift(val)
      sethistory(obj)
    }
  }


  findadditive = (value) => {
    console.log("Entered findadditive",value)
    value.forEach((val)=>{
      let out = Data.items.find((it) => it["eNumber"] == val);
    if (out) {
      updatehistory(out)
    } else {
      console.log("Not Found")
    }
    })
  }
  processText = (str) => {
    const regex = /\d{3,4}[a-z] *[(]i{1,3}[)]|\d{3,4} *[(]i{1,3}[)]|\d{3,4}[a-z]|(\d{3,4})/gm;
    let m;
    let values = []
     //console.log("***********************8", str)
    while ((m = regex.exec(str)) !== null) {
      // This is necessary to avoid infinite loops with zero-width matches
      if (m.index === regex.lastIndex) {
        regex.lastIndex++;
      }
      m.forEach((match, groupIndex) => {
         // console.log(`Found match, group ${groupIndex}: ${match}`);
        values.unshift(match)
      });


    }
     // console.log(values, "&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&77")
    let final = []
    values.forEach((it)=>{
      if(it!=undefined){
        final.unshift(it)
      }})
      findadditive(final);
  }
  processDocument = async (localFile) => {
    try {
      setnewimage("")
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        {
          title: 'Storage Permission',
          message: 'App needs access to memory to download the file ',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      } else {
        Alert.alert(
          'Permission Denied!',
          'You need to give storage permission to download the file',
        );
      }
    } catch (err) {
      console.warn(err);
    }

    const processed = await vision().textRecognizerProcessImage(localFile);

     // console.log('Found text in document: ', processed.text);
    let text = processed.text
    processText(text)
    setnewimage(text)
  }

  openCamera = async () => {
    PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.CAMERA,
      {
        title: 'Storage Permission',
        message: 'App needs access to memory to download the file ',
      },
    );
    ImagePicker.launchCamera(options, (response) => {
      // console.log('Response = ', response);

      // Same code as in above section!
      const source = { uri: response.uri };

      // You can also display the image using data:
      // const source = { uri: 'data:image/jpeg;base64,' + response.data };
      processDocument(source.uri)

    })
  }
  openLibrary = () => {

    PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      {
        title: 'Storage Permission',
        message: 'Go to hell ',
      },
    );
    // Open Image Library:
    ImagePicker.launchImageLibrary(options, (response) => {
      // Same code as in above section!
      const source = { uri: response.uri };

      // You can also display the image using data:
      // const source = { uri: 'data:image/jpeg;base64,' + response.data };
      processDocument(source.uri)

    })
  }



  return (
    <View style={{flex:1,justifyContent:"space-around",}}>
      <ScrollView style={styles.output}>
        <Mycustomcard strvalue={history} />
      </ScrollView>
      <TouchableOpacity onPress={() => { toggleOverlay() }} style={styles.floatingbutton}>
        <Image source={require('../../assets/icons/plus.png')} style={{ height: 48, width: 48 }}></Image>
      </TouchableOpacity>
      <Overlay isVisible={visible}  onBackdropPress={() => { toggleOverlay() }} animationType="fade" overlayStyle={{ flexDirection: "row", paddingHorizontal:35, width: "70%", justifyContent: "space-around", borderRadius: 10 }} >
        <TouchableOpacity
          style={styles.overlaytext}
          onPress={() => {
            toggleOverlay();
            openCamera();
          }}>
          <Image source={require('../../assets/icons/camera.png')} style={{ height: 48, width: 48 }} />
          <Text>Camera</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.overlaytext}
          onPress={() => {
            toggleOverlay();
            openLibrary();
          }} >
          <Image source={require('../../assets/icons/gallery.png')} style={{ height: 48, width: 48 }} />
          <Text>Library</Text>
        </TouchableOpacity>
      </Overlay>

    </View>
  );
}

const styles = StyleSheet.create({
  output: {
    flex: 1,
    
  },
  floatingbutton: {
    position: "absolute",
    right: 40,
    bottom: 40,
  },
  overlaytext: {
    padding: 10
  },
})

