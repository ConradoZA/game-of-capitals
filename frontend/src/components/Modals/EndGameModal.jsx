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

export const EndGameModal = ({ continent, successes, handleHideEnd }) => {
  const [name, setName] = useState("");

  const classes = styles.useStyles();

  if (successes === 0) handleHideEnd();

  const changeName = (event) => {
    setName(event.target.value);
  };

  const onSubmit = () => {
    fetch(`http://localhost:3001/scores/${continent}/${name}`)
      .then(async (response) => {
        const json = await response.json();
        console.log(json);
        if (json.id) {
          fetch(`http://localhost:3001/scores/${continent}/${name}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ score: successes }),
          })
            .then((res) => {
              if (res.status === 409) {
                console.log("Ya existe, con un número mayor");
              } else {
                handleHideEnd();
              }
            })
            .catch((error) => {
              console.error("There was an error!", error);
            });
        } else {
          fetch("http://localhost:3001/scores", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ score: successes, name, continent }),
          })
            .then((response) => {
              const json2 = response.json();
              console.log(json2);
              if (response.status === 200) {
                handleHideEnd();
              } else {
                console.log(response);
              }
            })
            .catch((error) => {
              console.error("There was an error!", error);
            });
        }
      })
      .catch((error) => console.error("There was an error!", error));
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
        <Button onClick={handleHideEnd}>I dont' want to save my score</Button>
        <Button onClick={onSubmit}>Send</Button>
      </CardActions>
    </Card>
  );
};
