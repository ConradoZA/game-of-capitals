import React, { useContext } from "react";
import QuizContext from "../../context/quiz-context";
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Button,
  Divider,
} from "@material-ui/core";

export const NewGameModal = ({ saidNo, saidYes }) => {
  const { userHits } = useContext(QuizContext);

  return (
    <Card className="flex column transCenter">
      <CardHeader className="bolder" title="Play Again?" />
      <CardContent>
        <Divider />
        <p>Your game has finished with {userHits} points.</p>
        <p>Do you want to play again?</p>
      </CardContent>
      <CardActions>
        <Button onClick={saidYes}>Yes</Button>
        <Button onClick={saidNo}>No</Button>
      </CardActions>
    </Card>
  );
};
