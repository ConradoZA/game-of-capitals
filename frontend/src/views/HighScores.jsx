import React from "react";
import {
  TableContainer,
  Table,
  TableBody,
  TableRow,
  TableCell,
} from "@material-ui/core";

export const HighScores = () => {
  return (
    <div>
      <img src="high_scores.png" alt="high scores" />
      <TableContainer component={Paper}>
        <Table>
          <TableBody>
            {/* {rows.map((row) => ( */}
            <TableRow>
              <TableCell align="right" sortDirection="desc">
                Number
              </TableCell>
              <TableCell align="center">Name</TableCell>
            </TableRow>
            {/* ))} */}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};
