import React from 'react'
import {Button, StyleSheet, View, ScrollView, Alert} from 'react-native'
import {logout, getUserArtistsPromise} from '../spotify-api-client'
import {Notifications} from 'expo'
import registerForPushNotificationsAsync from '../core/notifications'
import ArtistaFavorito from './ArtistaFavorito'
export default class HomeScreen extends React.Component {
  state = {
    result: null,
    notification: null,
  }

  componentDidMount() {
    registerForPushNotificationsAsync()
    getUserArtistsPromise().then(artistas => this.setState({artistas}))
    this._notificationSubscription = Notifications.addListener(this._handleNotification)
  }

  _handleLogoutButtonPress = () => {
    logout().then(() => {
      this.props.navigation.navigate('Auth')
    })
  }

  _handleNotification = notification => {
    console.log(notification)
    if (notification)
      Alert.alert(
        'Message',
        notification.data.message,
        [
          {
            text: 'Cancel',
            onPress: () => console.log('Cancel Pressed'),
            style: 'cancel',
          },
          {text: 'OK', onPress: () => console.log('OK Pressed')},
        ],
        {cancelable: false}
      )
    this.setState({notification: notification})
  }

  render() {
    const {loggedIn, artistas} = this.state

    return (
      <View style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollView} contentContainerStyle={styles.scrollViewContent}>
          {artistas && artistas.map(artist => <ArtistaFavorito artista={artist} key={artist.nombre} />)}
        </ScrollView>
        <View style={styles.buttonsContainer}>
          <Button title='Logout' onPress={this._handleLogoutButtonPress} />
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  buttonsContainer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    minHeight: 45,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#000000C0',
  },

  scrollView: {
    flex: 1,
    width: '100%',
  },

  scrollViewContent: {
    alignItems: 'center',
    paddingTop: 20,
  },
})
