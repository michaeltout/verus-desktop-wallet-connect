import React from 'react';
import { connect } from 'react-redux';
import { 
  SetupRender
} from './setup.render';
import { setNavigationPath } from '../../../../redux/reducers/navigation/navigation.actions'
import { getPathParent } from '../../../../redux/reducers/navigation/navigation.util'
import { SIGN_UP } from '../../../../utils/constants'

class Setup extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      seedGenerator: false,
    }

    this.toggleSeedGenerator = this.toggleSeedGenerator.bind(this)
    this.submitSeed = this.submitSeed.bind(this)
  }

  toggleSeedGenerator() {
    this.setState({ seedGenerator: !this.state.seedGenerator })
  }

  submitSeed(seed) {
    this.props.setSeed(seed, () => {
      this.props.dispatch(setNavigationPath(`${getPathParent(this.props.pathArray)}/${SIGN_UP}`))
    })
  }

  render() {
    return SetupRender.call(this);
  }
}

const mapStateToProps = (state) => {
  return {
    pathArray: state.navigation.pathArray,
  };
};

export default connect(mapStateToProps)(Setup);