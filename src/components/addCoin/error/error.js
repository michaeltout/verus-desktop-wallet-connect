import { Button } from '@material-ui/core';
import React from 'react';
import { connect } from 'react-redux';
import { setNavigationPath } from '../../../redux/reducers/navigation/navigation.actions';
import { AUTHORIZE_COIN } from '../../../utils/constants';

class Error extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {    
    return (
      <div
        style={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div>{"Error attempting to authorize coin."}</div>
        {this.props.error ? (
          <textarea
            className="error-textarea"
            rows="10"
            cols="80"
            value={this.props.error.stack}
          />
        ) : null}
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          onClick={() => {
            this.props.clearError();
            this.props.dispatch(setNavigationPath(AUTHORIZE_COIN));
          }}
        >
          {"Try Again"}
        </Button>
      </div>
    );
  }
}

export default connect()(Error);
