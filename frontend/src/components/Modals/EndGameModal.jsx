import React, { useState, Fragment, useRef, useContext } from "react";
import QuizContext from "../../context/quiz-context";
import SetupContext from "../../context/setup-context";
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
import { API_URL } from "../../data/api-config";
import { useAsyncState } from "../../data/extraFunctions/customHooks";

export const EndGameModal = ({ handleHideEnd }) => {
  const { userHits } = useContext(QuizContext);
  const { continent, difficulty } = useContext(SetupContext);

  const nameRef = useRef();

  const [name, setName] = useAsyncState("");
  const [msg, setMsg] = useState("");
  const [openSnack, setOpenSnack] = useState(false);

  const classes = styles.useStyles();

  if (userHits === 0) handleHideEnd();

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
    setName(nameRef.current.value);
    const API_URI_1 = `${API_URL}/scores/${continent}/${difficulty}`;
    const API_URI_2 = `${API_URI_1}/${name.current}`;
    console.log(name.current, typeof name.current);
    fetch(API_URI_2)
      .then(async (response) => {
        const jsonResponse = await response.json();
        if (jsonResponse.id) {
          console.log(API_URI_2);
          fetch(API_URI_2, fetchOptions("PUT", { score: userHits }))
            .then((res) => {
              console.log(res);
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
            API_URI_1,
            fetchOptions("POST", {
              score: userHits,
              name: name.current,
              continent,
            })
          )
            .then(async (response) => {
              if (response.status === 201) {
                handleHideEnd();
              } else if (response.status === 409) {
                LOG_ERROR("This name already exists in this game continent");
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
    <Fragment>
      <Card className="flex column transCenter">
        <CardHeader className="bolder" title="Game Over" />
        <CardContent>
          <Divider />
          <p>{`You have successfully placed ${userHits} cities!`}</p>
          <br />
          <TextField
            className={classes.formControl}
            label="Please insert your name:"
            inputRef={nameRef}
            variant="filled"
          />
        </CardContent>
        <CardActions>
          <Button onClick={handleHideEnd}>I dont' want to save my score</Button>
          <Button onClick={onSubmit}>Send</Button>
        </CardActions>
      </Card>
      <MySnackBar msg={msg} openSnack={openSnack} closeSnack={closeSnack} />
    </Fragment>
  );
};
