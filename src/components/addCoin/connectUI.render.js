import React from 'react';
import {
  AUTHORIZE_COIN,
  EXTERNAL_ACTION
} from '../../utils/constants'
import AuthorizeCoin from './authorizeCoin/authorizeCoin'
import ExternalLogin from './externalAction/externalAction'
import Loading from '../Loading';
import Error from './error/error';
import { setError } from '../../redux/reducers/error/error.actions';

export const AddCoinRender = function() {
  const COMPONENT_PROPS = {
    pathArray: this.props.pathArray
  }

  const COMPONENT_MAP = {
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

  return this.props.error != null ? (
    <Error
      error={this.props.error}
      clearError={() => this.props.dispatch(setError(null))}
      completeAuthorization={this.completeAuthorization}
    />
  ) : this.props.port != null && this.props.originDapp != null ? (
    this.props.pathArray[0] ? (
      COMPONENT_MAP[this.props.pathArray[0]]
    ) : null
  ) : (
    <Loading />
  );
}


