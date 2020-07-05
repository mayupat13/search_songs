import React, { Component, PureComponent } from 'react';
import { View, 
  Text, 
  StyleSheet, 
  TouchableHighlight, 
  StatusBar, 
  Image,
  NetInfo,
  Alert,
  TouchableOpacity,
  ToastAndroid,
  TouchableWithoutFeedback,
  FlatList,
  Dimensions,
  Share,
  Modal,
  ActivityIndicator,
  TextInput
} from 'react-native';

import { StackNavigator } from "react-navigation";
import Myicon from './Myicon.js'

var { height, width } = Dimensions.get('window');
const API = 'https://itunes.apple.com/search?term='

class Each_song extends PureComponent {

  constructor(props) {
    super(props);
    this.state = {
    };
  }


  render() {
    return (
      <View> 
        <View style={{margin:5,marginTop:5}}>  
            <View style={styles.content}>
              <View style={{marginTop:5}}>
                <Text numberOfLines={2}>artistId: {this.props.songdata.artistId}</Text>
                <Text numberOfLines={2}>trackNumber: {this.props.songdata.trackNumber}</Text>
                <Text numberOfLines={2}>artistName: {this.props.songdata.artistName}</Text>
                <Text numberOfLines={2}>collectionName: {this.props.songdata.collectionName}</Text>
              </View>
            </View>
        </View>
      </View>
      
    );
  }
}






export default class Home extends Component {
  static navigationOptions = {
     headerShown: false
  };

  constructor(props) {
      super(props);
      this.state = {
        isLoading:false,
        isFocused:false,
        query:'',
        search_song_size:0
      };
    }



  Search_song(query) {
    this.setState({isLoading:true})
    const { navigate } = this.props.navigation;
    fetch(`${API}${query}`,{
      method: "GET",
      headers: {
        'Accept': 'application/json',
        // 'Content-Type': 'application/json',
      },
    }).then((response) => response.json())
      .then((responseData) => {
        if (!responseData){
          Alert.alert('Try Again','Something went wrong')
          this.Search_song();
        }else
        {
        console.log(responseData);
          this.setState({
            isLoading:false,
            search_song_size:responseData.results.length,
            search_songs:responseData.results,
          });
        }
      })
      .catch((error) => {
         Alert.alert('Something Went Wrong','Please Try Again Later.')
      })
  };






renderRowItem = (itemData) => {
  const { params } = this.props.navigation.state;
  return (
    <Each_song
      navigation = {this.props.navigation}
      songdata={itemData.item}
      songdata_length={this.state.all_song_size}
     />
    )
  }


handleFocus = () => this.setState({isFocused: true})

handleBlur = () => this.setState({isFocused: false})

render() {
    const { navigate } = this.props.navigation;
    return(
      <View style={styles.container}>
            <StatusBar
              backgroundColor="#fff"
              barStyle="dark-content"
            />
            <View>
                <View>
                  {this.state.all_song_size  === 0 ?
                    <View>
                        <Text> no data {this.state.all_song_size}</Text> 
                    </View>
                      :
                    <View>
                      <View style={styles.searchSection}>
                        <TextInput
                          onFocus={this.handleFocus}
                          onBlur={this.handleBlur}
                          style={[styles.searchbox, {
                               borderColor: this.state.isFocused
                                   ? '#5E56E7'
                                   : '#F0F0F6',
                               borderWidth: 1,
                           }]}
                          onChangeText={text => this.setState({query:text}) }
                          //value={value}
                          placeholder="Search Song here"
                        />
                        <Myicon style={{padding:10}} name="Search" onPress={() => this.Search_song(this.state.query)} color={'#5E56E7'} size={22} />
                      </View>

                      {this.state.isLoading ?
                        <View style={{flex:1,justifyContent: 'center',alignItems:'center'}}>
                          <ActivityIndicator size="large" color="green" />
                        </View>
                      : null}

                      <View>
                        {this.state.search_song_size !== 0 ?
                          <View>
                            <Text>Your first 50 results</Text>
                            <FlatList
                              horizontal={false}
                              data={this.state.search_songs}
                              keyExtractor={(item, index) => index.toString() + item.title + item.id}
                              renderItem={this.renderRowItem}
                            />
                          </View>
                          :
                          <Text>No Results Found search with another Keywords</Text>
                        }
                      </View>
                    </View>
                  }
                </View>
            </View>
      </View>
    );
  }
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    backgroundColor:'#fff',
    borderColor:'#ccc',
    borderWidth:1,
    borderRadius:5,
    elevation:10,
    padding:5
  },
  searchbox:{
    flex: 1,
    paddingTop: 10,
    paddingRight: 10,
    paddingBottom: 10,
    paddingLeft: 10,
    backgroundColor: '#fff',
    color: '#424242',
  },
  searchSection: {
    // flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    margin:5
},
})

