import React, { useState } from "react";
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Button,
  TextField,
  Divider,
} from "@material-ui/core";
import * as styles from "../../data/extraFunctions/materialStyles";

export const EndGameModal = ({ successes, handleHideEnd }) => {
  const classes = styles.useStyles();

  const [name, setName] = useState("");
  const changeName = (event) => {
    setName(event.target.value);
    console.log("This does nothing... yet");
  };

  return (
    <Card className="flex column transCenter">
      <CardHeader className="bolder" title="Game Over" />
      <CardContent>
        <Divider />
        <p>{`You have successfully placed ${successes} cities!`}</p>
        <br />
        <TextField
          className={classes.formControl}
          label="Please insert your name:"
          value={name}
          onChange={changeName}
          variant="filled"
        />
      </CardContent>
      <CardActions>
        <Button onClick={handleHideEnd}>Send</Button>
      </CardActions>
    </Card>
  );
};
