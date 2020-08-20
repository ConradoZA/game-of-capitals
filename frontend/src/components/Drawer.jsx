import React, { useContext, useState } from "react";
import SetupContext from "../context/setup-context";
import {
  Divider,
  List,
  ListItem,
  ListItemIcon,
  FormControl,
  Select,
  InputLabel,
  ListItemText,
  Dialog,
} from "@material-ui/core";
import StarsIcon from "@material-ui/icons/Stars";
import PublicIcon from "@material-ui/icons/Public";
import MapIcon from "@material-ui/icons/Map";
import * as styles from "../data/extraFunctions/materialStyles";
import { HighScores } from "../pages/HighScores";

export const Drawer = () => {
  const classes = styles.useStyles();

  const [highScoresOpen, setHighScoresOpen] = useState(false);

  const {
    continent,
    difficulty,
    setNewContinent,
    setNewDifficulty,
  } = useContext(SetupContext);
  const handleChangeContinent = (event) => {
    setNewContinent(event.target.value);
  };
  const handleChangeDifficulty = (event) => {
    setNewDifficulty(event.target.value);
  };

  return (
    <div>
      <div className={classes.toolbar} />
      <List>
        <ListItem>
          <ListItemIcon>
            <PublicIcon style={{ color: "#7593f5" }} />
          </ListItemIcon>
          <FormControl className={classes.formControl}>
            <InputLabel htmlFor="continent">Game Continent</InputLabel>
            <Select
              native
              value={continent}
              id="continent"
              onChange={handleChangeContinent}
            >
              <option value={1}>Africa</option>
              <option value={2}>Asia</option>
              <option value={3}>Europe</option>
              <option value={4}>North America</option>
              <option value={5}>Oceania</option>
              <option value={6}>South America</option>
            </Select>
          </FormControl>
        </ListItem>
        <ListItem>
          <ListItemIcon>
            <MapIcon style={{ color: "#e7ff60" }} />
          </ListItemIcon>
          <FormControl className={classes.formControl}>
            <InputLabel htmlFor="difficulty">Game Difficulty</InputLabel>
            <Select
              native
              value={difficulty}
              id="difficulty"
              onChange={handleChangeDifficulty}
            >
              <option value={"easy"}>Easy</option>
              <option value={"normal"}>Normal</option>
              <option value={"hard"}>Hard</option>
            </Select>
          </FormControl>
        </ListItem>
      </List>
      <Divider />
      <List>
        <ListItem
          button
          onClick={() => {
            setHighScoresOpen(true);
          }}
        >
          <ListItemIcon>
            <StarsIcon style={{ color: "#da0000" }} />
          </ListItemIcon>
          <ListItemText primary="HighScores" />
        </ListItem>
      </List>
      <Dialog
        open={highScoresOpen}
        onClose={() => {
          setHighScoresOpen(false);
        }}
      >
        <HighScores />
      </Dialog>
    </div>
  );
};
