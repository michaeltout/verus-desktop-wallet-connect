import { Button } from '@material-ui/core';
import React from 'react';
import ProtectedInputForm from '../../../ProtectedInputForm';

export const SignUpRender = function() {
  return (
    <div style={{
      height: "100%",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
    }}>
      { this.state.attachSeed ? SignUpRenderForm.call(this) : SignUpRenderChoices.call(this) }
    </div>
  );
}

export const SignUpRenderChoices = function() {
  const { formLock } = this.state

  return (
    <React.Fragment>
      <div
        className="d-lg-flex flex-column justify-content-lg-center align-items-lg-center"
        style={{ maxWidth: 650, paddingBottom: 15 }}
      >
        <h1
          className="text-break text-center d-md-flex justify-content-md-center align-items-md-center"
          style={{
            marginBottom: 0,
            color: "rgb(0,0,0)",
            fontSize: 16,
            width: "max-content",
            maxWidth: "100%"
          }}
        >
          Would you like to make this seed the main seed for&nbsp;<strong>{" " + this.props.users[this.props.activeUserId].name}</strong>?
        </h1>
      </div>
      <div
        className="d-lg-flex flex-column justify-content-lg-center align-items-lg-center"
        style={{ maxWidth: 650, paddingBottom: 40 }}
      >
        <h1
          className="text-break text-center d-md-flex justify-content-md-center align-items-md-center"
          style={{
            marginBottom: 0,
            color: "rgb(0,0,0)",
            fontSize: 16,
            width: "max-content",
            maxWidth: "100%"
          }}
        >
          {
            "If you do, your seed will be encrypted, and you'll be able to access it through a password."
          }
        </h1>
      </div>
      <Button
        type="submit"
        fullWidth
        variant="contained"
        color="primary"
        disabled={formLock}
        style={{
          fontSize: 14,
          backgroundColor: "rgb(49, 101, 212)",
          borderWidth: 1,
          borderColor: "rgb(49, 101, 212)"
        }}
        onClick={this.toggleAttachSeed}
      >
        {"Yes, attach my seed to this profile"}
      </Button>
      <a
        className="text-right"
        disabled={formLock}
        onClick={formLock ? () => {} : () => {
          this.setState({
            formLock: true
          }, () => this.props.activateCoin())
        }}
        href="#"
        style={{
          paddingTop: 20,
          color: "#3f51b5"
        }}
      >
        {`No, just add ${this.props.chainTicker}`}
      </a>
    </React.Fragment>
  );
}

export const SignUpRenderForm = function() {
  return (
    <ProtectedInputForm 
      heading="Enter a password"
      submitBtnText="Continue"
      onSubmit={this.linkUserWithSeed}
      confirmHeading="Enter your password again"
      confirm={true}
      confirmBtnText="Confirm & Add Coin"
      inputDisabled={this.props.loading || this.state.formLock}
      submitDisabled={this.props.loading || this.state.formLock}
    />
  )
}


