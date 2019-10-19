import React from 'react'
import { ActivityIndicator, AsyncStorage, StatusBar, StyleSheet, View, TextInput, Text, Button } from 'react-native'
import { isLoggedIn } from '../spotify-api-client'
import { getUser } from '../core/firestore'

export default class AuthLoadingScreen extends React.Component {
  constructor(props) {
    super(props)
    this._bootstrapAsync()
  }

  state = {
    logged: false,
    name: ''
  }

  // Fetch the token from storage then navigate to our appropriate place
  _bootstrapAsync = async () => {
    const loggedIn = await isLoggedIn()
    this.setState({logged: loggedIn})  
  }

  _handleInputChange = (e) => {
    this.setState({name: e})
  }
  
  _handleButtonPress = () => {
    if (this.state.name) {
      const name = this.state.name 
      getUser({id: 'IAMHARDCODED', name: name })
      this.props.navigation.navigate(this.state.logged ? 'App' : 'Auth')
    } else {
      console.warn('No se ingresó nombre')
    }
  }


  // Render any loading content that you like here
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles['text']}>🌈 ¿Cómo te llamás? 🦄</Text>
        <TextInput style={{ borderColor: 'black', borderWidth: 1, height: 40, width: 200, marginBottom: 25, borderRadius: 5 }} onChangeText={(e) => this._handleInputChange(e)} editable
      maxLength={40}/> 
      <Button color="#00e5ff" title="Enviar" onPress={this._handleButtonPress}></Button>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    marginBottom: 15,
    color: 'hotpink'  
  }
})
