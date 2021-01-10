import React from 'react';
import {
  AUTHORIZE_COIN,
  CONFIGURE_LITE,
  CONFIGURE_NATIVE
} from './addCoin.constants'
import ConfigureLite from './configureLite/configureLite'
import ConfigureNative from './configureNative/configureNative'
import AuthorizeCoin from './authorizeCoin/authorizeCoin'

export const AddCoinRender = function() {
  const COMPONENT_PROPS = {
    pathArray: this.props.pathArray,
    setAddCoinParams: this.getAddCoinParams,
    addCoinParams: this.state.addCoinParams
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
    )
  };

  return (
    this.props.pathArray[0] ? COMPONENT_MAP[this.props.pathArray[0]] : null
  );
}


