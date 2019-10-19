import React from 'react'
import {connect} from 'react-redux'
import {View, Button, StyleSheet} from 'react-native'
import {authorize} from '../spotify-api-client'
import {SET_USER} from '../reducers/user'

class SignInScreen extends React.Component {
  static navigationOptions = {
    title: 'Necesitas estar logueado',
  }

  _handleAuthButtonPress = () => {
    authorize().then(loggedIn => {
      if (loggedIn) {
        this.props.navigation.navigate('App')
      }
    })
  }

  render() {
    return (
      <View style={styles.container}>
        {/*  <Login setUserData={this.props.setUserData} navigate={this.props.navigation.navigate} /> */}
        <Button title='Login con Spotify' onPress={this._handleAuthButtonPress} />
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
})
const mapDispatchToProps = dispatch => {
  return {
    setUserData(uid) {
      return dispatch({
        type: SET_USER,
        payload: {
          uid,
        },
      })
    },
  }
}
export default connect(
  null,
  mapDispatchToProps
)(SignInScreen)
