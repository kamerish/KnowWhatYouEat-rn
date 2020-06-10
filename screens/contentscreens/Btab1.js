import React from 'react';
import {
  View,
  ScrollView,
  Image,
  KeyboardAvoidingView,
  StyleSheet,
} from 'react-native';

import {SearchBar} from 'react-native-elements';

import Data from '../../FoodAdditives/foodAdditiveNumbers';
import MyCustomcard from '../../components/mainLogic';
import {TouchableOpacity} from 'react-native-gesture-handler';

class MySearchBar extends React.Component {
  state = {
    search: '',
    history: [],
    classfunc: [],
  };
  updateSearch = (search) => {
    this.setState({search: search});
  };

  updatehistory = (val) => {
    let obj = this.state.history;
    if (typeof obj[0] != 'undefined') {
      // edited here
      if (obj[0].eNumber != val.eNumber) {
        obj.unshift(val);
        this.setState({history: obj});
      } else {
        this.setState({history: obj});
      }
    } else {
      obj.unshift(val);
      this.setState({history: obj});
    }
  };

  findadditive = (val) => {
    console.log(val);
    let out = Data.items.find((it) => it['eNumber'] == val);
    
    if (out) {
      this.updatehistory(out);
    } else {
      let out2 = Data.items.find((it) => it['additiveName'].toLocaleLowerCase() == val.toLocaleLowerCase());
      console.log(out2)
      if(out2)
      {
        this.updatehistory(out2);
      } else {
      alert(
        'The item ' +
          val +
          ' is not available in our Database. We are constantly Updating it.Thanks ..',
      );
      }
    }
  };

  MycustomSearchbar = () => {
    const {search} = this.state;
    return (
      <SearchBar
        placeholder="Search for Additives Here..."
        placeholderTextColor="white"
        onChangeText={this.updateSearch}
        value={search}
        clearIcon={() => {
          return (
            <TouchableOpacity 
              onPress={() => {
                this.updateSearch('');
              }}>
              <Image
                source={require('../../assets/icons/close.png')}
                style={{height: 15, width: 15}}></Image>
            </TouchableOpacity>
          );
        }}
        lightTheme={true}
        inputStyle={{
          includeFontPadding: true,
          fontWeight: 'bold',
          color: 'black',
        }}
        containerStyle={{borderRadius: 30, margin: 10, padding: 0,backgroundColor: '#B8B8B7',opacity:0.9}}
        inputContainerStyle={{borderRadius: 20, }}
        onSubmitEditing={() => {
          if (this.state.search.trim()) {
            this.findadditive(this.state.search.trim());
          } else {
          }
        }}
        onFocus={() => {
          this.updateSearch('');
        }}
        autoCorrect={false}
        searchIcon={() => {
          return (
            <TouchableOpacity>
              <Image
                source={require('../../assets/icons/search.png')}
                style={{height: 20, width: 20}}
              />
            </TouchableOpacity>
          );
        }}
      />
    );
  };
  render() {
    return (
      <KeyboardAvoidingView style={styles.keyboardcontainer}>
        <View style={styles.mainView}>
          <ScrollView>
            <MyCustomcard strvalue={this.state.history} />
          </ScrollView>
        </View>

        <this.MycustomSearchbar />
      </KeyboardAvoidingView>
    );
  }
}
export default MySearchBar;

const styles = StyleSheet.create({
  keyboardcontainer: {justifyContent: 'flex-end', flex: 1},
  mainView: {flex: 1},
});
