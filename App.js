

import React from 'react'
import {View,Text} from 'react-native'
import SwitchNavigator from './navigation/SwitchNavigator'

import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'

import thunkMiddleware from 'redux-thunk'
import reducer from './reducers'

const middleware = applyMiddleware(thunkMiddleware)
const store = createStore(reducer, middleware)
import {StatusBar} from 'react-native'
import { Provider as PaperProvider, DarkTheme } from 'react-native-paper';

console.disableYellowBox = true;

export default class App extends React.Component {
	render() {
		return (
			
			<Provider store={store}>
				<PaperProvider theme={DarkTheme } >
				<SwitchNavigator  />
				</PaperProvider>
			</Provider>
		)
	}
}

