import React, { useState } from "react";
import {
  AppBar,
  CssBaseline,
  Drawer,
  Hidden,
  IconButton,
  Toolbar,
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import { useStyles } from "./data/extraFunctions/materialStyles";
import { Drawer as MyDrawer } from "./views/Drawer";
import { Game } from "./views/Game";

const App = () => {
  const classes = useStyles();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [newGame, setNewGame] = useState(false);
  const [continent, setContinent] = useState(3);
  const [difficulty, setDifficulty] = useState("normal");

  const handleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };
  const handleContinent = (newContinent) => {
    setContinent(newContinent);
  };
  const handleDifficulty = (newDifficulty) => {
    setDifficulty(newDifficulty);
  };
  const reset = () => {
    setNewGame(!newGame);
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <IconButton
            color="inherit"
            edge="start"
            onClick={handleDrawer}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
          <h2 style={{ marginLeft: "13%" }}>Game of Capitals</h2>
        </Toolbar>
      </AppBar>
      <nav className={classes.drawer}>
        <Hidden mdUp implementation="css">
          <Drawer
            variant="temporary"
            anchor="left"
            open={drawerOpen}
            onClose={handleDrawer}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true,
            }}
          >
            <MyDrawer />
          </Drawer>
        </Hidden>
        <Hidden smDown implementation="css">
          <Drawer
            classes={{
              paper: classes.drawerPaper,
            }}
            variant="permanent"
            open
          >
            <MyDrawer
              continent={continent}
              handleContinent={handleContinent}
              difficulty={difficulty}
              handleDifficulty={handleDifficulty}
              reset={reset}
            />
          </Drawer>
        </Hidden>
      </nav>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <Game
          continent={continent}
          difficulty={difficulty}
          newGame={newGame}
          reset={reset}
        />
      </main>
    </div>
  );
};

export default App;
