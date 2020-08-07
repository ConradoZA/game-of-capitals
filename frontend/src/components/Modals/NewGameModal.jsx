import React from "react";
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Button,
  Divider,
} from "@material-ui/core";

export const NewGameModal = ({ successes, saidNo, saidYes }) => {
  return (
    <Card className="flex column transCenter">
      <CardHeader className="bolder" title="Play Again?" />
      <CardContent>
        <Divider />
        <p>Your game has finished with {successes} points.</p>
        <p>Do you want to play again?</p>
      </CardContent>
      <CardActions>
        <Button onClick={saidYes}>Yes</Button>
        <Button onClick={saidNo}>No</Button>
      </CardActions>
    </Card>
  );
};
