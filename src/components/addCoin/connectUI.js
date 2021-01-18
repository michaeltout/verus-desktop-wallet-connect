import React from 'react';
import { connect } from 'react-redux';
import { 
  AddCoinRender
} from './connectUI.render';

class AddCoin extends React.Component {
  constructor(props) {
    super(props);

    this.state = {}
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
    error: state.error.error,
    rpcPassword: state.rpc.password,
    windowId: state.rpc.windowId
  };
};

export default connect(mapStateToProps)(AddCoin);