import { Button } from "@material-ui/core";
import React from "react";

export const ExternalActionRender = function () {
  const { loading } = this.state

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
      {this.actionTypes[this.props.externalAction].desc}
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
        >
          {"Open Verus Desktop"}
        </Button>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          disabled={loading}
          onClick={this.tryUser}
        >
          {"Continue"}
        </Button>
      </div>
    </div>
  );
};

