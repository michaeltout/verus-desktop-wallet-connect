import React from 'react';
import { connect } from 'react-redux';
import { 
  AuthorizeCoinRender
} from './authorizeCoin.render';

class AuthorizeCoin extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
    }
  }

  // this.props.setAddCoinParams(
  //   {coinObj: chosenCoin, mode, startParams: this.generateStartupOptions()},
  //   () => {
  //     this.props.dispatch(setModalNavigationPath(`${getPathParent(this.props.pathArray)}/${CONFIGURE}_${selectedMode}`))
  // })  

  render() {
    return AuthorizeCoinRender.call(this);
  }
}

const mapStateToProps = (state) => {
  return {
    path: state.navigation.path,
  };
};

export default connect(mapStateToProps)(AuthorizeCoin);