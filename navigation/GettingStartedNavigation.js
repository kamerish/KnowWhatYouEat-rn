import React from 'react';
import {createStackNavigator,TransitionPresets,CardStyleInterpolators} from '@react-navigation/stack';

import GettingStarted from '../screens/GettingStarted'
import Login from '../screens/Login'
import Signup from '../screens/Signup'
import { NavigationContainer } from '@react-navigation/native';
const Stack = createStackNavigator();



function StartedNavigation(){
    
    return(
        <NavigationContainer  >
            <Stack.Navigator headerMode="none" screenOptions={
                {
                    gestureEnabled: true,
                    gestureDirection:"horizontal",
                    ...TransitionPresets.ScaleFromCenterAndroid 
                    // cardStyleInterpolator:CardStyleInterpolators.forHorizontalIOS
                }} >
                <Stack.Screen name = "GettingStarted" component={GettingStarted} />
                <Stack.Screen name = "Login" component={Login} />
                <Stack.Screen name = "Signup" component={Signup} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}


export default StartedNavigation;