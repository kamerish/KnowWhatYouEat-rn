import React from 'react'
import { createSwitchNavigator, createAppContainer } from 'react-navigation'
import Profile from '../screens/Home'
import Loading from '../screens/LoadingScreen';
import GettingStarted from './GettingStartedNavigation';

const SwitchNavigator = createSwitchNavigator(
	{
		Loading: {
			screen: Loading
		},
		Started: {
			screen: GettingStarted
		},
		Profile: {
			screen: Profile
		}
	},
	{
		initialRouteName: 'Loading'
	}
)

export default createAppContainer(SwitchNavigator)
