import React from "react";
import { Card, CardHeader, CardContent, Divider } from "@material-ui/core";

export const PointModal = ({ distance, cityName }) => {
  return (
    <Card className="flex column transCenter">
      <CardHeader className="bolder" title="Bullseye!" />

      <CardContent>
        <Divider />
        <p>
          You have managed to get {distance} km. close to {cityName}.
        </p>
        <p>Congrats! Get a cookie... I mean, a point.</p>
      </CardContent>
    </Card>
  );
};
