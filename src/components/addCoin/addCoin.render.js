import React from 'react';
import {
  AUTHORIZE_COIN,
  CONFIGURE_LITE,
  CONFIGURE_NATIVE,
  EXTERNAL_ACTION
} from '../../utils/constants'
import ConfigureLite from './configureLite/configureLite'
import ConfigureNative from './configureNative/configureNative'
import AuthorizeCoin from './authorizeCoin/authorizeCoin'
import ExternalLogin from './externalAction/externalAction'
import Loading from '../Loading';
import Error from './error/error';

export const AddCoinRender = function() {
  const COMPONENT_PROPS = {
    pathArray: this.props.pathArray,
    setAddCoinParams: this.getAddCoinParams,
    addCoinParams: this.state.addCoinParams,
    completeAuthorization: this.completeAuthorization,
    setError: this.getError
  }

  const COMPONENT_MAP = {
    [CONFIGURE_LITE]: (
      <ConfigureLite
        {...COMPONENT_PROPS}
      />
    ),
    [CONFIGURE_NATIVE]: (
      <ConfigureNative
        {...COMPONENT_PROPS}
      />
    ),
    [AUTHORIZE_COIN]: (
      <AuthorizeCoin
        {...COMPONENT_PROPS}
      />
    ),
    [EXTERNAL_ACTION]: (
      <ExternalLogin
        {...COMPONENT_PROPS}
      />
    )
  };

  return this.state.error != null ? (
    <Error error={this.state.error} clearError={() => this.setState({ error: null })}/>
  ) : this.props.port != null && this.props.originApp != null ? (
    this.props.pathArray[0] ? (
      COMPONENT_MAP[this.props.pathArray[0]]
    ) : null
  ) : (
    <Loading />
  );
}


