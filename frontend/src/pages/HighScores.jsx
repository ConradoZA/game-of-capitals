import React, { useState, useRef } from "react";
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
  Select,
} from "@material-ui/core";
import { useAsyncState } from "../data/extraFunctions/customHooks";
import { MySnackBar } from "../components/MySnackBar";
import { API_URL } from "../data/api-config";

export const HighScores = () => {
  const [continent, setContinent] = useState(3);
  const updateContinent = (event) => {
    setContinent(event.target.value);
  };
  const [difficulty, setDifficulty] = useState("normal");
  const updateDifficulty = (event) => {
    setDifficulty(event.target.value);
  };

  const [data, setData] = useAsyncState([]);

  const [openSnack, setOpenSnack] = useState(false);
  const [msg, setMsg] = useState("");
  const showSnack = (message) => {
    setMsg(message);
    setOpenSnack(true);
  };
  const closeSnack = () => {
    setOpenSnack(false);
  };

  const LOG_ERROR = (error) => {
    showSnack("There was an error!");
    console.error(error);
  };

  const showHighScores = () => {
    fetch(`${API_URL}/scores/${continent}/${difficulty}`)
      .then(async (response) => {
        const jsonResponse = await response.json();
        setData(jsonResponse);
        if (jsonResponse.length === 0) {
          showSnack("Nothing to show");
        }
      })
      .catch((error) => LOG_ERROR(error));
  };

  return (
    <div>
      <img src="high_scores.png" alt="high scores" className="highscore" />
      <FormControl style={{ minWidth: "30vw", marginLeft: "1rem" }}>
        <InputLabel htmlFor="continent">Continent</InputLabel>
        <Select
          native
          id="continent"
          value={continent}
          onChange={updateContinent}
        >
          <option value=""></option>
          <option value={1}>Africa</option>
          <option value={2}>Asia</option>
          <option value={3}>Europe</option>
          <option value={4}>North America</option>
          <option value={5}>Oceania</option>
          <option value={6}>South America</option>
        </Select>
      </FormControl>
      <FormControl style={{ minWidth: "30vw", marginLeft: "1rem" }}>
        <InputLabel htmlFor="difficulty">Difficulty</InputLabel>
        <Select
          native
          id="difficulty"
          value={difficulty}
          onChange={updateDifficulty}
        >
          <option value=""></option>
          <option value={"easy"}>Easy</option>
          <option value={"normal"}>Normal</option>
          <option value={"hard"}>Hard</option>
        </Select>
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
