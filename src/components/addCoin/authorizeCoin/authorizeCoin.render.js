import { Button } from "@material-ui/core";
import React from "react";
import { NATIVE } from '../../../utils/constants'

export const AuthorizeCoinRender = function () {
  const { loading } = this.state
  const { coinRequest, originDapp } = this.props
  const { chainTicker, mode } = coinRequest

  return (
    <div
      style={{
        height: '100%',
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {`${originDapp.name} is trying to connect to ${chainTicker} in ${mode === NATIVE ? 'native' : `lite (${mode})` } mode. Would you like to authorize this action?`}
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          width: '90%',
          marginTop: 48
        }}
      >
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          disabled={loading}
          onClick={() => this.props.completeAuthorization(false)}
          style={{
            width: 100
          }}
        >
          {"No"}
        </Button>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          disabled={loading}
          onClick={this.authorizeCoin}
          style={{
            width: 100
          }}
        >
          {"Yes"}
        </Button>
      </div>
    </div>
  );
};

