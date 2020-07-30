import React from "react";
import { Paper } from "@material-ui/core";

const Score = ({ successes, points, cityName, cityCountry }) => {
  return (
    <div className="paper">
      <Paper variant="outlined">
        You have to find <b>{cityName}</b>, in <b>{cityCountry}</b>
      </Paper>
      <Paper variant="outlined">
        <b>{successes}</b> cities placed
      </Paper>
      <Paper variant="outlined">
        <b>{points}</b> kilometers left
      </Paper>
    </div>
  );
};

export default Score;
