import React from "react";
import { Card, CardHeader, CardContent, Divider } from "@material-ui/core";

export const NoInputModal = () => {
  return (
    <Card className="flex column transCenter">
      <CardHeader className="bolder" title="Ah-ah-ahhhh..." />
      <CardContent>
        <Divider />
        <p>You didn't say the magic word...</p>
        <p>Please, select a place on Earth and then click on "answer".</p>
      </CardContent>
    </Card>
  );
};
