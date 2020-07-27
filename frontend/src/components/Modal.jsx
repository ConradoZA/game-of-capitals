import React from "react";
import { Card, CardHeader, CardContent } from "@material-ui/core";

export const Modal = ({ title, content }) => {
  return (
    <Card className="flex column transCenter">
      <CardHeader className="bolder" title={title} />
      <CardContent>
        <p>{content}</p>
      </CardContent>
    </Card>
  );
};
