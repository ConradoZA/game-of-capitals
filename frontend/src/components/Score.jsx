import React, { useContext } from "react";
import QuizContext from "../context/quiz-context";
import { Paper } from "@material-ui/core";

const Score = () => {
  const { quizCapital, quizCountry, userHits, userPoints } = useContext(
    QuizContext
  );

  return (
    <div className="paper">
      <Paper variant="outlined">
        You have to find <b>{quizCapital}</b>, in <b>{quizCountry}</b>
      </Paper>
      <Paper variant="outlined">
        <b>{userHits}</b> cities placed
      </Paper>
      <Paper variant="outlined">
        <b>{userPoints.current}</b> kilometers left
      </Paper>
    </div>
  );
};

export default Score;
