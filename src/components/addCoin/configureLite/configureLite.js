import React from 'react';
import { connect } from 'react-redux';
import { 
  ConfigureLiteRender
} from './configureLite.render';
import {
  SETUP,
  LOGIN,
  ADD_COIN,
  AUTHORIZE_COIN,
  SEED_STORED_AUTHENTICATED,
  SEED_STORED_UNAUTHENTICATED,
  API_SUCCESS,
} from "../../../utils/constants";
import { initCoin } from '../../../rpc/calls/initCoin'
import { authenticateSeed } from '../../../rpc/calls/authenticate'
import { setNavigationPath } from '../../../redux/reducers/navigation/navigation.actions';
import { checkAuthentication } from '../../../rpc/calls/checkAuth';

class ConfigureLite extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      seed: null,
      password: null,
      loading: false,
      
      //DEPRECATED, TODO: DELETE
      error: false,
    }

    this.getSeed = this.getSeed.bind(this)
    this.getPassword = this.getPassword.bind(this)
    this.activateCoin = this.activateCoin.bind(this)
    this._handleError = this._handleError.bind(this)
  }

  async componentDidMount() {
    const authCheck = await checkAuthentication(this.props.addCoinParams.mode)

    if (authCheck.msg === API_SUCCESS && authCheck.result) {
      this.activateCoin()
    } else {
      let navigationAction
      if (this.props.activeUser.pinFile) {
        navigationAction = setNavigationPath(this.props.pathArray.join('/') + '/' + LOGIN)
      } else {
        navigationAction = setNavigationPath(this.props.pathArray.join('/') + '/' + SETUP)
      }

      this.props.dispatch(navigationAction)
    }
  }

  getSeed(seed, callback) {
    this.setState({ seed }, () => { if (callback) callback()})
  }

  getPassword(password, callback) {
    this.setState({password}, () => { if (callback) callback()})
  }

  _handleError(error) {
    console.error(error)
    this.props.setError(error)
  }

  activateCoin(checkedAuth) {
    this.setState({ loading: true }, async () => {
      const { addCoinParams } = this.props
      const { seed } = this.state

      try {
        if (!checkedAuth) {
          const authCheck = await checkAuthentication(addCoinParams.mode)
          const authenticated = authCheck.msg === API_SUCCESS && authCheck.result
          if (!authenticated) await authenticateSeed(seed)
        }

        const result = await initCoin(
          addCoinParams.chainTicker,
          addCoinParams.mode,
          addCoinParams.launchConfig);
  
        if (result.msg === 'error') {
          this._handleError(new Error(result.result))
        } else {
          this.props.completeAuthorization({
            authorized: true,
            error: null
          });
        }
      } catch (e) {
        this._handleError(e)
      }
    })
  }

  render() {
    return ConfigureLiteRender.call(this);
  }
}

const mapStateToProps = (state) => {
  return {
    coinAuthenticationState: state.rpc.coinAuthenticationState,
    activeUser: state.user.users[state.user.activeUserId]
  };
};

export default connect(mapStateToProps)(ConfigureLite);