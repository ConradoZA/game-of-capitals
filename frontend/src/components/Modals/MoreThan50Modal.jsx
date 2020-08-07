import React from "react";
import { Card, CardHeader, CardContent, Divider } from "@material-ui/core";

export const MoreThan50Modal = ({ distance, cityName }) => {
  return (
    <Card className="flex column transCenter">
      <CardHeader className="bolder" title="Oooops!" />

      <CardContent>
        <Divider />
        <p>
          You are {distance} km. away from {cityName}.
        </p>
        <p>You need to be 50 km. close or less to get a point.</p>
      </CardContent>
    </Card>
  );
};
