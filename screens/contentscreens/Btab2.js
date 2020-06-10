import React, {Component, useState} from 'react';
import {
  Text,
  PermissionsAndroid,
  Alert,
  ScrollView,
  Image,
  TouchableOpacity,
  View,
  StyleSheet,
} from 'react-native';
import vision from '@react-native-firebase/ml-vision';

import ImagePicker, {
  ImagePickerStorageOptions,
} from 'react-native-image-picker';
import Mycustomcard from '../../components/mainLogic';
import {Button, Overlay} from 'react-native-elements';
import Firebase from '../../config/Firebase';
import Data from '../../FoodAdditives/foodAdditiveNumbers';


function LoadingComponent() {
  return (
    <View style={{justifyContent: 'center', alignItems: 'center'}}>
      <Image source={require('../../assets/icons/Loading.gif')} style={{height:400,width:400,backgroundColor:'transparent',opacity:0.5}}/>
      <Text style={{color: 'grey',fontWeight:"bold", marginTop: 10, padding: 10,fontSize:16,}}>
        Processing image...
      </Text>
    </View>
  );
}

function Btab2(props) {
  const [image, setnewimage] = useState('');
  const [visible, setVisible] = useState(false);
  const [firstScan, setFirstScan] = useState(false);
  const [history, sethistory] = useState([]);
  const [loading, setloading] = useState(false);
  

  toggleOverlay = () => {
    setVisible(!visible);
  };

  updatehistory = (val) => {
    let obj = history;
    if (typeof obj[0] != 'undefined') {
      if (obj[0].eNumber != val.eNumber) {
        obj.unshift(val);
        sethistory(obj);
      } else {
        sethistory(obj);
      }
    } else {
      obj.unshift(val);
      sethistory(obj);
    }
  };

  findadditive = (value) => {
    value.forEach((val) => {
      let out = Data.items.find((it) => it['eNumber'] == val);
      if (out) {
        updatehistory(out);
      }
    });
  };
  processText = (str) => {
    const regex = /\d{3,4}[a-z] *[(]i{1,3}[)]|\d{3,4} *[(]i{1,3}[)]|\d{3,4}[a-z]|(\d{3,4})/gm;
    let m;
    let values = [];
    while ((m = regex.exec(str)) !== null) {
      // This is necessary to avoid infinite loops with zero-width matches
      if (m.index === regex.lastIndex) {
        regex.lastIndex++;
      }
      m.forEach((match, groupIndex) => {
        
        values.unshift(match);
      });
    }
    
    let final = [];
    values.forEach((it) => {
      if (it != undefined) {
        final.unshift(it);
      }
    });
    findadditive(final);
  };


  processDocument = async (localFile) => {
    try {
      setFirstScan(true);
      setnewimage('');
      sethistory([]);
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        {
          title: 'Storage Permission',
          message: 'App needs access to memory to download the file ',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        const processed = await vision().textRecognizerProcessImage(localFile);
        setloading(false);
        let text = processed.text;
        processText(text);
        setnewimage(text);
      } else {
        Alert.alert(
          'Permission Denied!',
          'You need to give storage permission to download the file',
        );
      }
    } catch (err) {
      console.warn(err);
    }
  };

  openCamera = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        const options = {
          storageOptions: {
            skipBackup: true,
            path: 'KnowWhatYouEat',
          },
        };
        ImagePicker.launchCamera(options, (response) => {
          if (response.path) {
            // You can also display the image using data:
            // const source = { uri: 'data:image/jpeg;base64,' + response.data };
           // props.imageValue("kamerish")
            processDocument(response.path);
          } else {
            setloading(false);
          }
        });
      } else {
        console.log("Camera permission denied");
      }
    } catch (err) {
      console.warn(err);
    }

  };
  
  openLibrary = async () => {
    try {
      const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE
        );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        const options = {
          title: 'Select Avatar',
          customButtons: [{name: 'fb', title: 'Choose Photo from Facebook'}],
          storageOptions: {
            skipBackup: true,
            path: 'KnowWhatYouEat',
          },
        };
        // Open Image Library:
        ImagePicker.launchImageLibrary(options, (response) => {
          // Same code as in above section!
          if (response.path) {
            const source = {path: response.path};
           // props.imageValue("kamerish")
            processDocument(source.path);
          } else {
            setloading(false);
          }
        });
      } 
    }catch (err) {
      console.warn(err);
    }
  };

  return (
    <View style={styles.container}>
      {loading == true ? (
        <LoadingComponent />
      ) : (
        <ScrollView>
          <Mycustomcard strvalue={history} caller="scanner" count={firstScan}/>
        </ScrollView>
      )}

      <TouchableOpacity
        onPress={() => {
          toggleOverlay();
        }}
        style={styles.floatingbutton}>
        <Image
          source={require('../../assets/icons/plus.png')}
          style={{height: 48, width: 48}}></Image>
      </TouchableOpacity>
      <Overlay
        isVisible={visible}
        onBackdropPress={() => {
          toggleOverlay();
          setloading(false);
        }}
        presentationStyle="pageSheet"
        backdropStyle={{opacity:0}}
        animationType="fade"
        overlayStyle={styles.overlay}>
        <TouchableOpacity
          style={styles.overlaytext}
          onPress={() => {
            toggleOverlay();
            openCamera();
            setloading(true);
          }}>
          <Image
            source={require('../../assets/icons/camera.png')}
            style={styles.camera}
          />
          <Text style={{color:"grey"}}>Camera</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.overlaytext}
          onPress={() => {
            toggleOverlay();
            openLibrary();
            setloading(true);
          }}>
          <Image
            source={require('../../assets/icons/gallery.png')}
            style={styles.gallery}
          />
          <Text style={{color:"grey"}}>Library</Text>
        </TouchableOpacity>
      </Overlay>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-around',
  },
  output: {
    flex: 1,
  },
  floatingbutton: {
    position: 'absolute',
    right: 40,
    bottom: 40,
    zIndex:2000
  },
  overlay: {
    flexDirection: 'row',
    paddingHorizontal: 35,
    width: '70%',
    justifyContent: 'space-around',
    borderRadius: 10,
    opacity:0.8,
    elevation:10,
  },
  overlaytext: {
    padding: 10,
  },
  gallery: {
    height: 48,
    width: 48,
  },
  camera: {
    height: 48,
    width: 48,
  },
});



export default Btab2;