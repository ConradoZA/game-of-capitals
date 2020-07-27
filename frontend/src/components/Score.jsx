import React from "react";
import { Paper } from "@material-ui/core";

const Score = ({ successes, points, cityName }) => {
  return (
    <>
      <Paper className="paper" variant="outlined">
        You have to find <b>{cityName}</b>
      </Paper>
      <Paper className="paper" variant="outlined">
        <b>{successes}</b> cities placed
      </Paper>
      <Paper className="paper" variant="outlined">
        <b>{points}</b> kilometers left
      </Paper>
    </>
  );
};

export default Score;
