import React from "react";
import { Text, View, Button, ScrollView, Image, Keyboard, KeyboardAvoidingView } from "react-native";
import {
  Appbar,
  DarkTheme,
  Provider as PaperProvider,
  TextInput,
  Theme
} from "react-native-paper";

import { useNavigation } from "@react-navigation/native";
import {
  SearchBar,
} from "react-native-elements";

import Data from "../../FoodAdditives/foodAdditiveNumbers.json";
import MyCustomcard from './mainLogic';
import { TouchableOpacity } from "react-native-gesture-handler";
import { Searchbar } from 'react-native-paper';


class MySearchBar extends React.Component {
  state = {
    search: "",
    history: [],
    classfunc: [],
  };
  updateSearch = (search) => {
    this.setState({ search: search });

  };



  updatehistory = (val) => {
    let obj = this.state.history
    if (typeof (obj[0]) != "undefined") {     // edited here
      if (obj[0].eNumber != val.eNumber) {
        obj.unshift(val)
        this.setState({ history: obj })
      }
      else {
        this.setState({ history: obj })
      }
    }
    else {
      obj.unshift(val)
      this.setState({ history: obj })
    }
  }

  findadditive = (val) => {
    let out = Data.items.find((it) => it["eNumber"] == val);
    if (out) {
      this.updatehistory(out)
    } else {
      alert("The item " + val + " is not available in our Database. We are constantly Updating it..!Thanks ..")
    }
  };


  MycustomSearchbar = () => {
    const { search } = this.state;
    return (
      <SearchBar placeholder="Search for Additives Here..."
        onChangeText={this.updateSearch}
        value={search}
        clearIcon={() => {
          return (
            <TouchableOpacity onPress={() => { this.updateSearch("") }}  >
              <Image  source={require('../../assets/icons/close.png')} style={{ height: 15, width: 15 }} ></Image>
            </TouchableOpacity>
            
          )
        }}
        lightTheme={true}
        inputStyle={{ includeFontPadding: true, fontWeight: "bold", color: "black" }}
        containerStyle={{ borderRadius: 50,margin:10,padding:0}}
        inputContainerStyle={{ borderRadius: 20,backgroundColor:"white", }}
        onSubmitEditing={() => {
          if (this.state.search.trim()) {
            this.findadditive(this.state.search.trim())
          }
          else {

          }
        }}
        onFocus={() => { this.updateSearch("") }}
        searchIcon={() => {
          return (
            <TouchableOpacity  >
              <Image source={require('../../assets/icons/search.png')} style={{ height: 20, width: 20 }} />
            </TouchableOpacity>
          )
        }}
      />
    )
  }
  render() {

    return (
      <KeyboardAvoidingView style={{ justifyContent: "flex-end", flex: 1 }}>
        <View style={{ flex: 1 }}>
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
