import React from 'react';
import ProtectedInputForm from '../../../ProtectedInputForm';

export const LoginRender = function() {
  return (
    <div style={{
      height: "100%",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
    }}>
      <ProtectedInputForm 
        heading={`Enter profile password for ${this.props.activeUser.name}`}
        submitBtnText="Add Coin"
        onSubmit={this.submitPassword}
        inlineSubmit={true}
        helperText={this.state.formError ? this.state.formError : ''}
        inputDisabled={this.props.loading || this.state.formLock}
        submitDisabled={this.props.loading || this.state.formLock}
        error={this.state.formError ? true : false}
      />
    </div>
  );
}


