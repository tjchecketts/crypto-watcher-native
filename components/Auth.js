import React from 'react';
import {
  KeyboardAvoidingView,
  TouchableOpacity,
  Text,
  TextInput,
  StyleSheet,
} from 'react-native';
import { Link } from 'react-router-native';

class Auth extends React.Component {
  state = { email: '', password: '', passwordConfirmation: '', error: '' }

  handleSubmit = () => {
    //TODO handle auth
    this.setState({ email: '', password: '', passwordConfirmation: '' })
  }

  canSubmit = () => {
    const { email, password, passwordConfirmation } = this.state;
    let submit = false;
    let error;
    if (email && password)
      submit = true
    if (this.props.type === 'Register') {
      if (!passwordConfirmation) {
        submit = false
      } else if ((passwordConfirmation && password) && passwordConfirmation !== password) {
        error = 'Passwords Must Match'
        submit = false
        if (!this.state.error)
          this.setState({ error })
      } else {
        if (this.state.error)
          this.setState({ error: '' })
        submit = true
      }
    }

    return submit
  }

  render() {
    const { email, password, passwordConfirmation, error } = this.state;
    const { type } = this.props;
    const disabled = !this.canSubmit()
    return (
      <KeyboardAvoidingView behavior="padding" style={styles.container}>
        { error !== '' && <Text style={styles.error}>{error}</Text> }
          <Text style={styles.title}>{ this.props.type }</Text>
          <TextInput
            style={styles.input}
            placeholder="Email"
            autofocus
            autoCapitalize="none"
            autoCorrect={false}
            value={email}
            keyboardType="email-address"
            onChangeText={(email) => this.setState({ email }) }
          />
                  
        <TextInput
          style={styles.input}
          placeholder="Password"
          autoCapitalize="none"
          autoCorrect={false}
          value={password}
          secureTextEntry={true}
          onChangeText={(password) => this.setState({ password }) }
        />
        { this.props.type === 'Register' &&
                  
          <TextInput
            style={styles.input}
            placeholder="Password Confirmation"
            autoCapitalize="none"
            autoCorrect={false}
            value={passwordConfirmation}
            secureTextEntry={true}
            onChangeText={(passwordConfirmation) => this.setState({ passwordConfirmation }) }
          />
        }
    <TouchableOpacity onPress={disabled ? f => f : this.handleSubmit}>
    <Text style={styles.button}>{type}</Text>
  </TouchableOpacity>
  <Link to={ type === 'Register' ? '/login' : '/register' }>
    <Text style={styles.link}>
      { type === 'Register' ? 'Login' : 'Register' }
    </Text>
  </Link>
</KeyboardAvoidingView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'black',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  error: { color: 'red' },
    title: {
    color: 'white',
    fontSize: 40,
    textAlign: 'center',
    marginBottom: 10,
  },
  input: {
    marginLeft: 10,
    marginRight: 10,
    height: 50,
    marginBottom: 10,
    backgroundColor: 'white',
    width: 300,
    fontSize: 20,
  },
  button: {
    backgroundColor: 'blue',
    color: 'white',
    height: 40,
    fontSize: 20,
    lineHeight: 30,
    width: 300,
    marginLeft: 10,
    marginRight: 10,
    textAlign: 'center',
  },
  link: {
    color: 'lightblue',
    fontSize: 20,
  },
})

export default Auth;