import React, { useState, useEffect } from "react";
import { ActualMap } from "../components/Map";
import Score from "../components/Score";
import { Modal } from "../components/Modal";
import { Button, Dialog } from "@material-ui/core";
import * as africa from "../data/africa.json";
import * as asia from "../data/asia.json";
import * as europe from "../data/europe.json";
import * as northAmerica from "../data/north-america.json";
import * as oceania from "../data/oceania.json";
import * as southAmerica from "../data/south-america.json";
import {
  haversineDistance,
  malus,
  roundNumber,
  randomizeOrder,
} from "../components/maths";
import { useStyles } from "../data/materialStyles";

export const Game = ({ mode }) => {
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
    switch (mode) {
      case 1:
        mode = africa.default;
        break;
      case 2:
        mode = asia.default;
        break;
      case 3:
        mode = europe.default;
        break;
      case 4:
        mode = northAmerica.default;
        break;
      case 5:
        mode = oceania.default;
        break;
      case 6:
        mode = southAmerica.default;
        break;
      default:
        break;
    }
    const randomizedArray = randomizeOrder(mode);
    setQuestionList(randomizedArray);
  }, []);

  useEffect(() => {
    setMaxI(questionList.length);
    newQuestion();
  }, [questionList]);

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
          handleShowDistanceModal();
        }
      }
      newQuestion();
    }, 1500);
  }, [points]);

  const newQuestion = () => {
    if (questionList.length > 0 && i <= maxI) {
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
  const newPoints = () => {
    const dist = roundNumber(distance);
    const newPoints = malus(points, dist);
    setPoints(newPoints);
  };

  const onMapClick = (coordinates) => {
    setResult(coordinates);
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
        mode={mode}
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
