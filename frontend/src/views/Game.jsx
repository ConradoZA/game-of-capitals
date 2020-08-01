import React, { useState, useEffect, useCallback } from "react";
import { ActualMap } from "../components/Map";
import Score from "../components/Score";
import { Modal } from "../components/Modal";
import { Button, Dialog } from "@material-ui/core";
import { haversineDistance, malus, roundNumber } from "../components/maths";
import { useStyles } from "../data/materialStyles";
import { selectGame, endGame } from "../components/functions";

export const Game = ({ continent, difficulty, newGame, reset }) => {
  const [points, setPoints] = useState(1500);
  const [successes, setSuccesses] = useState(0);
  const [question, setQuestion] = useState({});
  const [questionList, setQuestionList] = useState([]);
  const [i, setI] = useState(0);
  const [maxI, setMaxI] = useState(0);
  const [distance, setDistance] = useState(0);
  const [result, setResult] = useState({});
  const [display, setDisplay] = useState(false);
  const [showDistanceModal, setShowDistanceModal] = useState(false);
  const [showEndGameModal, setShowEndGameModal] = useState(false);

  const classes = useStyles();

  useEffect(() => {
    const randomizedArray = selectGame(continent);
    setQuestionList(randomizedArray);
  }, [newGame]);

  useEffect(() => {
    const quizNumber = questionList.length;
    if (quizNumber > 0) {
      setMaxI(quizNumber);
      newQuestion();
    }
  }, [questionList]);

  useEffect(() => {
    newPoints();
  }, [distance]);

  useEffect(() => {
    if (maxI > 0) newQuestion();
  }, [maxI]);

  useEffect(() => {
    if (maxI > 0) {
      setTimeout(() => {
        clearTurn();
        if (endGame(points, maxI, i)) {
          handleShowEnd();
        } else {
          handleShowDistanceModal();
          newQuestion();
        }
      }, 1500);
    }
  }, [points]);

  const newQuestion = () => {
    if (maxI > 0 && i <= maxI) {
      setQuestion({
        cityName: questionList[i]["properties"]["capital"],
        cityCountry: questionList[i]["properties"]["country"],
        lat: questionList[i]["geometry"]["coordinates"][1],
        lng: questionList[i]["geometry"]["coordinates"][0],
      });
      setI(i + 1);
    }
  };

  const calculateDistance = () => {
    return haversineDistance(
      { lat: parseFloat(question.lat), lng: parseFloat(question.lng) },
      { lat: result.lat, lng: result.lng }
    );
  };

  const updateInfo = () => {
    const dist = roundNumber(calculateDistance());
    setDistance(dist);
    setDisplay(true);
    setSuccesses(successes + 1);
  };

  const newPoints = useCallback(() => {
    const dist = roundNumber(distance);
    const newPoints = malus(points, dist);
    setPoints(newPoints);
  }, [distance]);

  const onMapClick = (coordinates) => {
    setResult(coordinates);
  };

  const onSubmit = () => {
    if (result.lat) updateInfo();
  };

  const clearTurn = () => {
    setDisplay(false);
    setResult({});
  };
  const clearGame = () => {
    setSuccesses(0);
    setPoints(1500);
  };

  const handleShowDistanceModal = () => {
    setShowDistanceModal(true);
  };
  const handleHideDistance = () => {
    setShowDistanceModal(false);
  };
  const handleShowEnd = () => {
    setShowEndGameModal(true);
  };
  const handleHideEnd = () => {
    setShowEndGameModal(false);
    clearGame();
  };

  return (
    <div className={classes.gameLayout}>
      <Score
        successes={successes}
        points={points}
        cityName={question.cityName}
        cityCountry={question.cityCountry}
      />
      <br />
      <ActualMap
        question={question}
        result={result}
        onMapClick={onMapClick}
        display={display}
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

      <Dialog open={showDistanceModal} onClose={handleHideDistance}>
        <Modal
          title={distance <= 50 ? "BullsEye!" : "Congrats!"}
          line1={`You are ${roundNumber(
            distance
          )} km. away from the actual position.`}
          line2={distance <= 50 ? "It has been a complete SUCCESS." : ""}
        />
      </Dialog>
      <Dialog open={showEndGameModal} onClose={handleHideEnd}>
        <Modal
          title={"Game Over"}
          line1={`You have successfully placed ${successes} cities!`}
          line2={""}
        />
      </Dialog>
    </div>
  );
};
