import React, { useContext } from "react";
import QuizContext from "../../context/quiz-context";
import { Card, CardHeader, CardContent, Divider } from "@material-ui/core";

export const MoreThan50Modal = () => {
  const { quizCapital, userQuizDistance } = useContext(QuizContext);
  return (
    <Card className="flex column transCenter">
      <CardHeader className="bolder" title="Oooops!" />

      <CardContent>
        <Divider />
        <p>
          You are {userQuizDistance.current} km. away from {quizCapital}.
        </p>
        <p>You need to be 50 km. close or less to get a point.</p>
      </CardContent>
    </Card>
  );
};
