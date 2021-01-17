import React from 'react';
import { connect } from 'react-redux';
import { setUserAuth } from '../../../../rpc/calls/setUserAuth';
import { 
  SignUpRender
} from './signUp.render';

class SignUp extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      attachSeed: false,
      formLock: false,
      formErrors: false
    }

    this.linkUserWithSeed = this.linkUserWithSeed.bind(this)
    this.toggleAttachSeed = this.toggleAttachSeed.bind(this)
  }

  componentDidMount() {
    this.props.activateCoin()
  }

  linkUserWithSeed(password) {
    this.setState({ formLock: true }, async () => {
      try {
        await setUserAuth(this.props.users, this.props.activeUserId, password, this.props.seed)
        this.props.activateCoin()
      } catch (e) {
        console.error(e.message)
        this.setState({ formErrors: e.message, formLock: false })
      }
    })
  }

  toggleAttachSeed() {
    this.setState({ attachSeed: !this.state.attachSeed })
  }

  render() {
    return SignUpRender.call(this);
  }
}

const mapStateToProps = (state) => {
  return {
    users: state.user.users,
    activeUserId: state.user.activeUserId,
    chainTicker: state.rpc.coinRequest.chainTicker
  };
};

export default connect(mapStateToProps)(SignUp);