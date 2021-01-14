import React from 'react';
import { connect } from 'react-redux';
import { 
  AddCoinRender
} from './addCoin.render';

class AddCoin extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      addCoinParams: {
        chainTicker: null,
        mode: null,
        launchConfig: null,
        error: null
      }
    }

    this.getAddCoinParams = this.getAddCoinParams.bind(this)
    this.completeAuthorization = this.completeAuthorization.bind(this)
    this.getError = this.getError.bind(this)
  }

  getAddCoinParams(addCoinParams, callback) {
    this.setState({addCoinParams}, () => {if (callback) callback()})
  }

  getError(error) {
    this.setState({ error })
  }

  completeAuthorization(result) {
    console.log(result)
  } 

  render() {
    return AddCoinRender.call(this);
  }
}

const mapStateToProps = (state) => {
  return {
    path: state.navigation.path,
    pathArray: state.navigation.pathArray,
    port: state.rpc.port,
    originApp: state.origin.originApp
  };
};

export default connect(mapStateToProps)(AddCoin);