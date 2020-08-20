import React, { useContext } from "react";
import QuizContext from "../../context/quiz-context";
import { Card, CardHeader, CardContent, Divider } from "@material-ui/core";

export const PointModal = () => {
  const { quizCapital, userQuizDistance } = useContext(QuizContext);
  return (
    <Card className="flex column transCenter">
      <CardHeader className="bolder" title="Bullseye!" />

      <CardContent>
        <Divider />
        <p>
          You have managed to get {userQuizDistance.current} km. close to {quizCapital}.
        </p>
        <p>Congrats! Get a cookie... I mean, a point.</p>
      </CardContent>
    </Card>
  );
};
