import React, { useState, useEffect, useContext } from "react";
import SetupContext from "../context/setup-context";
import QuizContext from "../context/quiz-context";
import { QuizState } from "../context/QuizState";
import { ActualMap } from "../components/Map";
import Score from "../components/Score";
import { MoreThan50Modal } from "../components/Modals/MoreThan50Modal";
import { EndGameModal } from "../components/Modals/EndGameModal";
import { NewGameModal } from "../components/Modals/NewGameModal";
import { PointModal } from "../components/Modals/PointModal";
import { Button, Dialog } from "@material-ui/core";
import {
  haversineDistance,
  normalPoints,
  easyPoints,
  hardPoints,
} from "../data/extraFunctions/maths";
import { useStyles } from "../data/extraFunctions/materialStyles";
import {
  selectGame,
  endGameConditions,
} from "../data/extraFunctions/functions";
import { useRefState } from "../data/extraFunctions/customHooks";
import { NoInputModal } from "../components/Modals/NoInputModal";

export const Game = () => {
  const { continent, difficulty } = useContext(SetupContext);
  const {
    quizLatLng,
    userGuess,
    userHits,
    userPoints,
    userQuizDistance,
    setNewQuizLatLng,
    setNewCapital,
    setNewCountry,
    setNewGuess,
    setNewHits,
    setNewPoints,
    setNewUserQuizDistance,
  } = useContext(QuizContext);

  const [showDistanceModal, setShowDistanceModal] = useState(false);
  const [showEndGameModal, setShowEndGameModal] = useState(false);
  const [showNewGameModal, setShowNewGameModal] = useState(false);
  const [showNoInputModal, setShowNoInputModal] = useState(false);
  const [showPointModal, setShowPointModal] = useState(false);
  const [openGameOver, setOpenGameOver] = useState(false);
  const [displayObjetive, setDisplayObjetive] = useState(false);
  const [questionList, setQuestionList] = useRefState([]);
  const [maxI, setMaxI] = useRefState(0);
  const [i, setI] = useRefState(0);

  const classes = useStyles();

  useEffect(() => {
    clearGame();
    initGame();
  }, [continent]);

  const initGame = () => {
    const randomizedArray = selectGame(continent);
    setQuestionList(randomizedArray);
    setMaxI(questionList.current.length);
    newQuestion();
  };

  const clearGame = () => {
    setI(0);
    setNewPoints(1500);
    setNewHits(0);
    setNewQuizLatLng({});
    setNewCountry("");
    setNewCapital("");
    setQuestionList([]);
    endOfTurn();
  };

  const endOfTurn = () => {
    setDisplayObjetive(false);
    setNewGuess({});
  };

  const newQuestion = () => {
    if (i.current < maxI.current) {
      setNewQuizLatLng({
        lat: questionList.current[i.current]["geometry"]["coordinates"][1],
        lng: questionList.current[i.current]["geometry"]["coordinates"][0],
      });
      setNewCountry(questionList.current[i.current]["properties"]["country"]);
      setNewCapital(questionList.current[i.current]["properties"]["capital"]);
      setI(i.current + 1);
    } else {
      handleShowEnd();
    }
  };

  const newPoints = (minusPoints) => {
    let newPoints;
    switch (difficulty) {
      case "normal":
        newPoints = normalPoints(userPoints.current, minusPoints);
        break;
      case "easy":
        newPoints = easyPoints(userPoints.current, minusPoints);
        break;
      case "hard":
        newPoints = hardPoints(userPoints.current, minusPoints);
        break;
      default:
        newPoints = userPoints.current;
        break;
    }
    setNewPoints(newPoints);
  };

  const showModal = () => {
    setTimeout(() => {
      endOfTurn();
      if (endGameConditions(userPoints.current, maxI.current, i)) {
        handleShowEnd();
      } else if (userQuizDistance.current > 50) {
        handleShowDistanceModal();
      } else if (userQuizDistance.current <= 50) {
        handleShowPointModal();
      }
    }, 1800);
  };
  const handleShowDistanceModal = () => {
    setShowDistanceModal(true);
  };
  const handleHideDistance = () => {
    setShowDistanceModal(false);
    newQuestion();
  };
  const handleShowPointModal = () => {
    setShowPointModal(true);
  };
  const handleHidePointModal = () => {
    setShowPointModal(false);
    newQuestion();
  };
  const handleShowEnd = () => {
    setShowEndGameModal(true);
  };
  const handleHideEnd = () => {
    setShowEndGameModal(false);
    setShowNewGameModal(true);
  };
  const handleShowNoInput = () => {
    setShowNoInputModal(true);
  };
  const handleHideNoInput = () => {
    setShowNoInputModal(false);
  };

  const saidYes = () => {
    setShowNewGameModal(false);
    clearGame();
    initGame();
  };
  const saidNo = () => {
    setShowNewGameModal(false);
    setOpenGameOver(true);
  };

  const onSubmit = () => {
    if (userGuess.lat) {
      const realDistance = haversineDistance(quizLatLng, userGuess);
      const roundedDistance = Math.round(realDistance);
      setNewUserQuizDistance(roundedDistance);
      newPoints(roundedDistance);
      setDisplayObjetive(true);
      showModal();
      if (roundedDistance <= 50) setNewHits(userHits + 1);
    } else {
      handleShowNoInput();
    }
  };

  return (
    <div className={classes.gameLayout}>
      <Score />
      <br />
      <ActualMap displayObjetive={displayObjetive} />
      <Button
        style={{ margin: "1rem 0" }}
        variant="contained"
        color="secondary"
        onClick={onSubmit}
      >
        Answer
      </Button>

      <Dialog open={showNoInputModal} onClose={handleHideNoInput}>
        <NoInputModal />
      </Dialog>
      <Dialog open={showDistanceModal} onClose={handleHideDistance}>
        <MoreThan50Modal />
      </Dialog>
      <Dialog open={showPointModal} onClose={handleHidePointModal}>
        <PointModal />
      </Dialog>
      <Dialog open={showEndGameModal} onClose={handleHideEnd}>
        <EndGameModal handleHideEnd={handleHideEnd} />
      </Dialog>
      <Dialog open={showNewGameModal} onClose={saidNo}>
        <NewGameModal saidNo={saidNo} saidYes={saidYes} />
      </Dialog>
      <Dialog fullScreen open={openGameOver}>
        <div style={{ margin: "auto auto" }}>
          <h2>GAME OVER</h2>
        </div>
      </Dialog>
    </div>
  );
};
