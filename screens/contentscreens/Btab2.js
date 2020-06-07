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
  ActivityIndicator,
  Modal,
} from 'react-native';
import vision from '@react-native-firebase/ml-vision';

import ImagePicker, {
  ImagePickerStorageOptions,
} from 'react-native-image-picker';
import Mycustomcard from '../../components/mainLogic';
import {Button, Overlay} from 'react-native-elements';

import Data from '../../FoodAdditives/foodAdditiveNumbers.json';

function LoadingComponent() {
  return (
    <View style={{justifyContent: 'center', alignItems: 'center'}}>
      <ActivityIndicator size="large" color="##E63946" />
      <Text style={{color: 'Black',fontWeight:"bold", marginTop: 10, padding: 10,fontSize:16}}>
        Processing image...
      </Text>
    </View>
  );
}

export default function Btab2() {
  const [image, setnewimage] = useState('');
  const [visible, setVisible] = useState(false);
  const [firstScan, setFirstScan] = useState(false);
  const [history, sethistory] = useState([]);
  const [loading, setloading] = useState(false);
  const [modalvisible, setmodalvisible] = useState(false);

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
    console.log('Entered findadditive', value);
    value.forEach((val) => {
      let out = Data.items.find((it) => it['eNumber'] == val);
      if (out) {
        updatehistory(out);
      } else {
        console.log('Not Found');
      }
    });
  };
  processText = (str) => {
    const regex = /\d{3,4}[a-z] *[(]i{1,3}[)]|\d{3,4} *[(]i{1,3}[)]|\d{3,4}[a-z]|(\d{3,4})/gm;
    let m;
    let values = [];
    //console.log("***********************8", str)
    while ((m = regex.exec(str)) !== null) {
      // This is necessary to avoid infinite loops with zero-width matches
      if (m.index === regex.lastIndex) {
        regex.lastIndex++;
      }
      m.forEach((match, groupIndex) => {
        // console.log(`Found match, group ${groupIndex}: ${match}`);
        values.unshift(match);
      });
    }
    // console.log(values, "&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&77")
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
    setloading(false);
    let text = processed.text;
    processText(text);
    setnewimage(text);
  };

  openCamera = async () => {
    PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.CAMERA, {
      title: 'Storage Permission',
      message: 'App needs access to memory to download the file ',
    });
    const options = {
      storageOptions: {
        skipBackup: true,
        path: 'KnowWhatYouEat',
      },
    };

    ImagePicker.launchCamera(options, (response) => {
      if (response.uri) {
        const source = {uri: response.uri};
        console.log('Camera', source);
        // You can also display the image using data:
        // const source = { uri: 'data:image/jpeg;base64,' + response.data };
        processDocument(source.uri);
      } else {
        setloading(false);
      }
    });
  };
  openLibrary = () => {
    PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      {
        title: 'Storage Permission',
        message: 'Required to Load Image',
      },
    );
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
        processDocument(source.path);
      } else {
        setloading(false);
      }
    });
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
          <Text>Camera</Text>
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
          <Text>Library</Text>
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
