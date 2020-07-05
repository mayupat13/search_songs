import React from 'react';
import { Button,
  View,
  Text, 
  ActivityIndicator,
  FlatList,
  StatusBar,
    } from 'react-native';

import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer,createSwitchNavigator, } from 'react-navigation';
import { Screens } from 'react-native-screens';

import Splashscreen from './components/screens/Splashscreen'
import SearchSong from './components/screens/SearchSong'


import Chat_details from './components/screens/chat/Chat_details'



export default class App extends React.Component {
  render(){
    return(
      <View style={{flex:1}}>
        <StatusBar
          backgroundColor="#fff"
          barStyle="dark-content"
        />
        <AppContainer navigation={this.props.navigation}/>
      </View>
    );
  }
}



const HomeStack = createStackNavigator(
  { 
    SearchSong:SearchSong
  },
  {
    initialRouteName: 'SearchSong',
  }
);


const RootStack = createSwitchNavigator(
  {
    Splashscreen: Splashscreen,
    MainApp: HomeStack,
  },
  {
    initialRouteName: 'Splashscreen',
  }
);


const AppContainer = createAppContainer(RootStack);
