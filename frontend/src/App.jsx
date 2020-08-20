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
import { Drawer as ActualDrawer } from "./components/Drawer";
import { Game } from "./pages/Game";
import { SetupState } from "./context/SetupState";
import { QuizState } from "./context/QuizState";

const App = () => {
  const classes = useStyles();

  const [drawerOpen, setDrawerOpen] = useState(false);
  const handleDrawer = () => {
    setDrawerOpen(!drawerOpen);
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
      <SetupState>
        <QuizState>
          <nav className={classes.drawer}>
            <Hidden mdUp implementation="css">
              <Drawer
                variant="temporary"
                anchor="left"
                open={drawerOpen}
                onClose={handleDrawer}
                ModalProps={{
                  keepMounted: true,
                }}
              >
                <ActualDrawer />
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
                <ActualDrawer />
              </Drawer>
            </Hidden>
          </nav>
          <main className={classes.content}>
            <div className={classes.toolbar} />
            <Game />
          </main>
        </QuizState>
      </SetupState>
    </div>
  );
};

export default App;
