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
import { useStyles } from "./data/materialStyles";
import { Drawer as MyDrawer } from "./views/Drawer";
import { Game } from "./views/Game";

const App = () => {
  const classes = useStyles();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mode, setMode] = useState(2);

  const handleDrawer = () => {
    setMobileOpen(!mobileOpen);
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
          <h2>Game of Capitals</h2>
        </Toolbar>
      </AppBar>
      <nav className={classes.drawer}>
        <Hidden mdUp implementation="css">
          <Drawer
            variant="temporary"
            anchor="left"
            open={mobileOpen}
            onClose={handleDrawer}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
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
            <MyDrawer />
          </Drawer>
        </Hidden>
      </nav>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <Game mode={mode} />
      </main>
    </div>
  );
};

export default App;
