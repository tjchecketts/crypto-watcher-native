import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NativeRouter, Switch, Route } from 'react-router-native';
import Auth from './components/Auth';

export default class App extends React.Component {
  render() {
    return (
      <NativeRouter>
        <View style={styles.container}>
          <Switch>
            <Route exact path="/" render={ (props) => <Auth {...props} type="Login" /> } />
            <Route exact path="/login" render={ (props) => <Auth {...props} type="Login" /> } />
            <Route exact path="/register" render={ (props) => <Auth {...props} type="Register" /> } />
          </Switch>
        </View>
      </NativeRouter>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
  },
});