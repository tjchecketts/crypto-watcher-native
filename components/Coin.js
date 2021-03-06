import React from 'react';
import { StyleSheet, Text } from 'react-native';
import {
  Card,
  ListItem,
} from 'react-native-elements'
import Swipeout from 'react-native-swipeout';
import { removeCoin } from '../actions/coins';
import { connect } from 'react-redux';

class Coin extends React.Component {
  state = { color: 'green' }

  componentWillReceiveProps(nextProps) {
    const { price } = nextProps;
    let color = this.state.color;
    if ( price !== this.props.price ) {
      if (price > this.props.price)
        color = 'green'
      else
        color = 'red'
    }
    this.setState({ color })
  }

  swipeButtons = () => {
    const { dispatch, id } = this.props;
    return [{
      text: 'Delete',
      backgroundColor: 'red',
      onPress: () => { dispatch(removeCoin(id)) }
    }]
  }

  render() {
    const { symbol, price } = this.props;
    const { color } = this.state;
    return (
      <Swipeout
        right={this.swipeButtons()}
        autoClose={true}
        backgroundColor="transparent"
      >
        <ListItem 
          rightTitle={`$${parseFloat(price).toFixed(2)}`}
          rightTitleStyle={styles[color]}
          title={symbol}
          titleStyle={styles.title}
          hideChevron={true}
        /> 
      </Swipeout>
    )
  }
}

const styles = StyleSheet.create({
  title: { color: 'white' },
  green: { 
    backgroundColor: 'green', 
    color: 'white',
    fontSize: 20,
    width: 100,
    padding: 5,
    flex: 1,
  },
  red: { 
    backgroundColor: 'red', 
    color: 'white',
    width: 100,
    fontSize: 20,
  },
});

export default connect()(Coin);