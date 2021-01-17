import React from 'react';
import { connect } from 'react-redux';
import { 
  ConfigureNativeRender
} from './configureNative.render';
import { checkZcashParamsFormatted } from '../../../rpc/calls/zcashParams'
import {
  ADDCOIN_DELAY,
  EXTERNAL_ACTION,
  EXTERNAL_ZCASHPARAMS,
} from "../../../utils/constants";
import { initCoin } from '../../../rpc/calls/initCoin'
import { setExternalAction, setNavigationPath } from '../../../redux/reducers/navigation/navigation.actions';
import { setError } from '../../../redux/reducers/error/error.actions';

class ConfigureNative extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      done: false,
      overallProgress: 0,
      passThrough: false,

      //DEPRECATED, TODO: DELETE
      error: false,
    };
    
    this.canPassthrough = this.canPassthrough.bind(this)
    this.addCoin = this.addCoin.bind(this)
    this._handleError = this._handleError.bind(this)
  }

  async componentDidMount() {
    if (await this.canPassthrough()) {
      this.setState({ overallProgress: 100, passThrough: true })
      this.addCoin()
    } else {
      this.props.dispatch(setExternalAction(EXTERNAL_ZCASHPARAMS))
      this.props.dispatch(setNavigationPath(EXTERNAL_ACTION))
    }
  }

  async canPassthrough() {
    const zcashParamsErrors = await checkZcashParamsFormatted()

    if (zcashParamsErrors.msg === 'success') {
      const zcpmsRes = zcashParamsErrors.result
      
      if (zcpmsRes.length > 0) {
        return false
      } else {
        return true
      }
    } else {
      this.setState({ error: zcashParamsErrors.result })
      return false
    }
  }

  _handleError(error) {
    console.error(error)
    this.props.dispatch(setError(error))
  }

  async addCoin() {
    const { addCoinParams } = this.props

    try {
      const result = await initCoin(addCoinParams.chainTicker, addCoinParams.mode, addCoinParams.launchConfig)

      if (result.msg === "error") {
        this._handleError(new Error(result.result))
      } else {
        this.setState({ done: true }, () => {
          setTimeout(() => {
            this.props.completeAuthorization(true);
          }, ADDCOIN_DELAY);
        });
      }
    } catch (e) {
      this._handleError(e)
    }
  }

  render() {
    return ConfigureNativeRender.call(this);
  }
}

const mapStateToProps = (state) => {
  return {
    path: state.navigation.path,
    rpcPort: state.rpc.port,
  };
};

export default connect(mapStateToProps)(ConfigureNative);