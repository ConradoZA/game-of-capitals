import React, { useState, useEffect } from "react";
import { MapOverlay } from "./components/MapOverlay";
import Score from "./components/Score";
import {
  AppBar,
  CssBaseline,
  Drawer,
  Hidden,
  IconButton,
  Toolbar,
  Button,
  Dialog,
  Slide,
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import { useStyles } from "./data/materialStyles";
import { Drawer as MyDrawer } from "./components/Drawer";
import { Modal } from "./components/Modal";
import * as capitalCities from "./data/capitalCities.json";
import {
  haversineDistance,
  randomNumber,
  malus,
  roundNumber,
} from "./data/maths";

const App = () => {
  const classes = useStyles();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [points, setPoints] = useState(1500);
  const [successes, setSuccesses] = useState(0);
  const [question, setQuestion] = useState({});
  const [distance, setDistance] = useState(0);
  const [result, setResult] = useState({});
  const [display, setDisplay] = useState(false);
  const [showDistance, setShowDistance] = useState(false);
  const [showEndGame, setShowEndGame] = useState(false);

  const city = capitalCities.capitalCities;
  const totalCities = city.length;

  const createRandomCity = () => {
    const number = randomNumber(totalCities);
    const capital = city[number];
    return { name: capital.capitalCity, lat: capital.lat, lng: capital.long };
  };

  useEffect(() => {
    newQuestion();
  }, []);

  useEffect(() => {
    newPoints();
  }, [distance]);

  useEffect(() => {
    setTimeout(() => {
      if (points !== 1500) {
        clearTurn();
        if (points <= 0) {
          handleShowEnd();
        } else {
          handleShowDistance();
        }
      }
      newQuestion();
    }, 1500);
  }, [points]);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const onMapClick = (coordinates) => {
    setResult(coordinates);
  };

  const calculateDistance = () => {
    return haversineDistance(
      { lat: question.lat, lng: question.lng },
      { lat: result.lat, lng: result.lng }
    );
  };

  const updateInfo = () => {
    const dist = calculateDistance();
    setDistance(dist);
    setDisplay(true);
    const newSuccess = successes + 1;
    setSuccesses(newSuccess);
  };

  const newPoints = () => {
    const dist = roundNumber(distance);
    const newPoints = malus(points, dist);
    setPoints(newPoints);
  };

  const newQuestion = () => {
    const randomCity = createRandomCity();
    setQuestion(randomCity);
  };

  const onSubmit = () => {
    updateInfo();
  };

  const clearTurn = () => {
    setDisplay(false);
    setResult({});
  };
  const clearGame = () => {
    setSuccesses(0);
    setPoints(1500);
  };

  const handleShowDistance = () => {
    setShowDistance(true);
  };

  const handleHideDistance = () => {
    setShowDistance(false);
  };

  const handleShowEnd = () => {
    setShowEndGame(true);
  };

  const handleHideEnd = () => {
    setShowEndGame(false);
    clearGame();
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <IconButton
            color="inherit"
            edge="start"
            onClick={handleDrawerToggle}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
          <h2>Capitals of Europe</h2>
        </Toolbar>
      </AppBar>
      <nav className={classes.drawer}>
        <Hidden mdUp implementation="css">
          <Drawer
            variant="temporary"
            anchor="left"
            open={mobileOpen}
            onClose={handleDrawerToggle}
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
        <Score successes={successes} points={points} cityName={question.name} />
        <br />
        <MapOverlay
          className="map"
          question={question}
          result={result}
          onMapClick={onMapClick}
          display={display}
        />
        <Button
          style={{ margin: "1rem 0" }}
          variant="contained"
          color="secondary"
          onClick={onSubmit}
        >
          Answer
        </Button>
      </main>
      <Dialog open={showDistance} onClose={handleHideDistance}>
        <Modal
          title={`${distance <= 50 ? "BullsEye!" : "Congrats!"}`}
          content={`Your position has remained ${roundNumber(
            distance
          )}km close from its actual position.
          ${distance <= 50 ? "It has been a complete SUCCESS." : ""}`}
        />
      </Dialog>
      <Dialog open={showEndGame} onClose={handleHideEnd}>
        <Modal
          title={"Game Over"}
          content={`You has managed to place ${successes} cities!`}
        />
      </Dialog>
    </div>
  );
};

export default App;
