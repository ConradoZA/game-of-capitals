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
import { MySnackBar } from "../MySnackBar.jsx";

export const EndGameModal = ({
  continent,
  difficulty,
  successes,
  handleHideEnd,
}) => {
  const [name, setName] = useState("");
  const [msg, setMsg] = useState("");
  const [openSnack, setOpenSnack] = useState(false);

  const classes = styles.useStyles();

  if (successes === 0) handleHideEnd();

  const changeName = (event) => {
    setName(event.target.value);
  };
  const closeSnack = () => {
    setOpenSnack(false);
  };
  const showSnack = (message) => {
    setMsg(message);
    setOpenSnack(true);
  };
  const LOG_ERROR = (error) => {
    showSnack("There was an error!");
    console.error(error);
  };
  const fetchOptions = (method, body) => {
    return {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    };
  };

  const onSubmit = () => {
    fetch(`http://localhost:3001/scores/${continent}/${difficulty}/${name}`)
      .then(async (response) => {
        const jsonResponse = await response.json();
        if (jsonResponse.id) {
          fetch(
            `http://localhost:3001/scores/${continent}/${difficulty}/${name}`,
            fetchOptions("PUT", { score: successes })
          )
            .then((res) => {
              if (res.status === 409) {
                showSnack(
                  "It already exists that name with a higher number of points."
                );
              } else {
                handleHideEnd();
              }
            })
            .catch((error) => {
              LOG_ERROR(error);
            });
        } else {
          fetch(
            "http://localhost:3001/scores",
            fetchOptions("POST", { score: successes, name, continent })
          )
            .then(async (response) => {
              if (response.status === 201) {
                handleHideEnd();
              } else {
                LOG_ERROR("no es status 201");
              }
            })
            .catch((error) => {
              LOG_ERROR(error);
            });
        }
      })
      .catch((error) => LOG_ERROR(error));
  };

  return (
    <>
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
          <Button onClick={handleHideEnd}>I dont' want to save my score</Button>
          <Button onClick={onSubmit}>Send</Button>
        </CardActions>
      </Card>
      <MySnackBar msg={msg} openSnack={openSnack} closeSnack={closeSnack} />
    </>
  );
};
