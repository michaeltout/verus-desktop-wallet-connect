import React from "react";

export const AuthorizeCoinRender = function() {  
  return (
    <div
      style={{
        paddingBottom: 60,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center"
      }}>
      {this.state.chosenCoin ? SelectModeForm.call(this) : SelectCoinForm.call(this)}
    </div>
  );
};