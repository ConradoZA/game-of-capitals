import React from "react";
import { Card, CardHeader, CardContent } from "@material-ui/core";

export const Modal = ({ title, line1, line2 }) => {
  return (
    <Card className="flex column transCenter">
      <CardHeader className="bolder" title={title} />
      <CardContent>
        <p>{line1}</p>
        <p>{line2}</p>
      </CardContent>
    </Card>
  );
};
