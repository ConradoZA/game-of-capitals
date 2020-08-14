import React, { useState } from "react";
import {
  TableContainer,
  Table,
  TableBody,
  TableRow,
  TableCell,
  Button,
  FormControl,
  InputLabel,
  TableHead,
  NativeSelect,
} from "@material-ui/core";
import { useAsyncState } from "../data/extraFunctions/customHooks";
import { MySnackBar } from "../components/MySnackBar";

export const HighScores = () => {
  const [continent, setContinent] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [data, setData] = useAsyncState([{}]);
  const [openSnack, setOpenSnack] = useState(false);
  const [msg, setMsg] = useState("");

  const LOG_ERROR = (error) => {
    showSnack("There was an error!");
    console.error(error);
  };
  const closeSnack = () => {
    setOpenSnack(false);
  };
  const showSnack = (message) => {
    setMsg(message);
    setOpenSnack(true);
  };

  const changeContinent = (event) => {
    setContinent(event.target.value);
  };
  const changeDifficulty = (event) => {
    setDifficulty(event.target.value);
  };

  const showHighScores = () => {
    fetch(`http://localhost:3001/scores/${continent}/${difficulty}`)
      .then(async (response) => {
        const jsonResponse = await response.json();
        if (jsonResponse.length > 0) {
          setData(jsonResponse);
        } else {
          LOG_ERROR("No data");
        }
      })
      .catch((error) => LOG_ERROR(error));
  };

  return (
    <div>
      <img src="high_scores.png" alt="high scores" className="highscore" />
      <FormControl style={{ minWidth: "30vw", marginLeft: "1rem" }}>
        <InputLabel htmlFor="continent">Continent</InputLabel>
        <NativeSelect
          id="continent"
          value={continent}
          onChange={changeContinent}
        >
          <option value=""></option>
          <option value={1}>Africa</option>
          <option value={2}>Asia</option>
          <option value={3}>Europe</option>
          <option value={4}>North America</option>
          <option value={5}>Oceania</option>
          <option value={6}>South America</option>
        </NativeSelect>
      </FormControl>
      <FormControl style={{ minWidth: "30vw", marginLeft: "1rem" }}>
        <InputLabel htmlFor="difficulty">Difficulty</InputLabel>
        <NativeSelect
          id="difficulty"
          value={difficulty}
          onChange={changeDifficulty}
        >
          <option value=""></option>
          <option value={"easy"}>Easy</option>
          <option value={"normal"}>Normal</option>
          <option value={"hard"}>Hard</option>
        </NativeSelect>
      </FormControl>
      <Button
        variant="outlined"
        style={{ marginTop: "1rem", marginLeft: "0.5rem" }}
        onClick={showHighScores}
      >
        Show
      </Button>
      <TableContainer style={{ marginTop: "1rem" }}>
        <Table stickyHeader>
          <TableHead>
            <TableCell
              align="left"
              style={{ width: "50vw", marginLeft: "1rem" }}
            >
              Name
            </TableCell>
            <TableCell
              align="left"
              sortDirection="desc"
              style={{ width: "30vw" }}
            >
              Points
            </TableCell>
          </TableHead>
          <TableBody>
            {data.current.map((row) => (
              <TableRow key={row.id}>
                <TableCell component="th" scope="row" align="left">
                  {row.username}
                </TableCell>
                <TableCell align="left">{row.score}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <MySnackBar msg={msg} openSnack={openSnack} closeSnack={closeSnack} />
    </div>
  );
};
