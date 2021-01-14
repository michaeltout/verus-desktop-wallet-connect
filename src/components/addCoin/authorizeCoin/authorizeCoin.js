import React from 'react';
import { connect } from 'react-redux';
import { setExternalAction, setNavigationPath } from '../../../redux/reducers/navigation/navigation.actions';
import { 
  AuthorizeCoinRender
} from './authorizeCoin.render';
import { CONFIGURE, EXTERNAL_ACTION, EXTERNAL_LOGIN, NATIVE } from '../../../utils/constants'
import { checkAndUpdateUsers } from '../../../redux/reducers/user/user.actions';

class AuthorizeCoin extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false
    }

    this.authorizeCoin = this.authorizeCoin.bind(this);
  }

  authorizeCoin() {
    this.setState({ loading: true }, async () => {
      const userActions = await checkAndUpdateUsers()
      userActions.map(action => this.props.dispatch(action))

      if (this.props.activeUserId) {
        this.props.setAddCoinParams(this.props.coinRequest, () => {
          this.props.dispatch(
            setNavigationPath(`${CONFIGURE}_${this.props.coinRequest.mode === NATIVE ? 'NATIVE' : 'LITE'}`)
          );
        });
      } else {
        this.props.setAddCoinParams(this.props.coinRequest, () => {
          this.props.dispatch(setExternalAction(EXTERNAL_LOGIN))
          this.props.dispatch(
            setNavigationPath(EXTERNAL_ACTION)
          );
        });
      }
    })
  }

  render() {
    return AuthorizeCoinRender.call(this);
  }
}

const mapStateToProps = (state) => {
  return {
    path: state.navigation.path,
    coinRequest: state.rpc.coinRequest,
    activeUserId: state.user.activeUserId,
    originApp: state.origin.originApp
  };
};

export default connect(mapStateToProps)(AuthorizeCoin);