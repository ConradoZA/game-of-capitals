import React, { useState, useEffect, useCallback } from "react";
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
  roundNumber,
  easyPoints,
  hardPoints,
} from "../data/extraFunctions/maths";
import { useStyles } from "../data/extraFunctions/materialStyles";
import {
  selectGame,
  endGameConditions,
} from "../data/extraFunctions/functions";
import { useAsyncState } from "../data/extraFunctions/customHooks";
import { NoInputModal } from "../components/Modals/NoInputModal";

export const Game = ({ continent, difficulty, newGame, reset }) => {
  const gameMode = useAsyncState(difficulty, true);
  const [showDistanceModal, setShowDistanceModal] = useState(false);
  const [showEndGameModal, setShowEndGameModal] = useState(false);
  const [showNewGameModal, setShowNewGameModal] = useState(false);
  const [showNoInputModal, setShowNoInputModal] = useState(false);
  const [showPointModal, setShowPointModal] = useState(false);
  const [openGameOver, setOpenGameOver] = useState(false);
  const [displayObjetive, setDisplayObjetive] = useState(false);
  const [questionList, setQuestionList] = useAsyncState([]);
  const [question, setQuestion] = useAsyncState({});
  const [maxI, setMaxI] = useAsyncState(0);
  const [i, setI] = useAsyncState(0);
  const [result, setResult] = useAsyncState({});
  const [distance, setDistance] = useAsyncState(0);
  const [points, setPoints] = useAsyncState(1500);
  const [successes, setSuccesses] = useAsyncState(0);

  const classes = useStyles();

  useEffect(() => {
    clearGame();
    initGame();
  }, [newGame]);

  const initGame = () => {
    const randomizedArray = selectGame(continent);
    setQuestionList(randomizedArray);
    setMaxI(questionList.current.length);
    newQuestion();
  };

  const clearGame = () => {
    setPoints(1500);
    setSuccesses(0);
    setQuestion({});
    setQuestionList([]);
    endOfTurn();
  };

  const endOfTurn = () => {
    setDisplayObjetive(false);
    setResult({});
  };

  const newQuestion = () => {
    if (i.current <= maxI.current) {
      setQuestion({
        cityName: questionList.current[i.current]["properties"]["capital"],
        cityCountry: questionList.current[i.current]["properties"]["country"],
        lat: questionList.current[i.current]["geometry"]["coordinates"][1],
        lng: questionList.current[i.current]["geometry"]["coordinates"][0],
      });
      setI(i.current + 1);
    } else {
    }
  };

  const newPoints = (minusPoints) => {
    let newPoints;
    switch (gameMode.current) {
      case "normal":
        newPoints = normalPoints(points.current, minusPoints);
        break;
      case "easy":
        newPoints = easyPoints(points.current, minusPoints);
        break;
      case "hard":
        newPoints = hardPoints(points.current, minusPoints);
        break;
      default:
        newPoints = points.current;
        break;
    }
    setPoints(newPoints);
  };

  const showModal = () => {
    setTimeout(() => {
      endOfTurn();
      if (endGameConditions(points.current, maxI.current, i)) {
        handleShowEnd();
      } else if (distance.current >= 50) {
        handleShowDistanceModal();
      } else if (distance.current < 50) {
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
  const saidYes = () => {
    setShowNewGameModal(false);
    clearGame();
    initGame();
  };
  const saidNo = () => {
    setShowNewGameModal(false);
    setOpenGameOver(true);
  };
  const handleShowNoInput = () => {
    setShowNoInputModal(true);
  };
  const handleHideNoInput = () => {
    setShowNoInputModal(false);
  };

  const onMapClick = useCallback((coordinates) => {
    setResult(coordinates);
  }, []);

  const onSubmit = useCallback(() => {
    if (result.current.lat) {
      const realDistance = haversineDistance(
        { lat: question.current.lat, lng: question.current.lng },
        { lat: result.current.lat, lng: result.current.lng }
      );
      const roundedDistance = roundNumber(realDistance);
      setDistance(roundedDistance);
      newPoints(roundedDistance);
      setDisplayObjetive(true);
      showModal();
      if (roundedDistance <= 50) setSuccesses(successes.current + 1);
    } else {
      handleShowNoInput();
    }
  }, []);

  return (
    <div className={classes.gameLayout}>
      <Score
        successes={successes.current}
        points={points.current}
        cityName={question.current.cityName}
        cityCountry={question.current.cityCountry}
      />
      <br />
      <ActualMap
        question={{ lat: question.current.lat, lng: question.current.lng }}
        result={result.current}
        onMapClick={onMapClick}
        displayObjetive={displayObjetive}
        continent={continent}
        reset={reset}
        newGame={newGame}
      />
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
        <MoreThan50Modal
          distance={distance.current}
          cityName={question.current.cityName}
        />
      </Dialog>
      <Dialog open={showPointModal} onClose={handleHidePointModal}>
        <PointModal
          distance={distance.current}
          cityName={question.current.cityName}
        />
      </Dialog>
      <Dialog open={showEndGameModal} onClose={handleHideEnd}>
        <EndGameModal
          continent={continent}
          successes={successes.current}
          handleHideEnd={handleHideEnd}
        />
      </Dialog>
      <Dialog open={showNewGameModal} onClose={saidNo}>
        <NewGameModal
          successes={successes.current}
          saidNo={saidNo}
          saidYes={saidYes}
        />
      </Dialog>
      <Dialog fullScreen open={openGameOver}>
        <div style={{ margin: "auto auto" }}>
          <h2>GAME OVER</h2>
        </div>
      </Dialog>
    </div>
  );
};
