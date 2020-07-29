import React, { useState, useEffect } from "react";
import { ActualMap } from "../components/Map";
import Score from "../components/Score";
import { Modal } from "../components/Modal";
import { Button, Dialog } from "@material-ui/core";
import * as capitalCities from "../data/capitalCities.json";
import {
  haversineDistance,
  randomNumber,
  malus,
  roundNumber,
} from "../components/maths";

export const Game = ({ mode }) => {
  const [points, setPoints] = useState(1500);
  const [successes, setSuccesses] = useState(0);
  const [question, setQuestion] = useState({});
  const [distance, setDistance] = useState(0);
  const [result, setResult] = useState({});
  const [display, setDisplay] = useState(false);
  const [showDistanceModal, setShowDistanceModal] = useState(false);
  const [showEndGameModal, setShowEndGameModal] = useState(false);

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
          handleShowDistanceModal();
        }
      }
      newQuestion();
    }, 1500);
  }, [points]);

  const onMapClick = (coordinates) => {
    setResult(coordinates);
  };

  const calculateDistance = () => {
    console.log(question, result);
    return haversineDistance(
      { lat: parseFloat(question.lat), lng: parseFloat(question.lng) },
      { lat: result.lat, lng: result.lng }
    );
  };

  const updateInfo = () => {
    const dist = calculateDistance();
    console.log(dist);
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
    <>
      <Score successes={successes} points={points} cityName={question.name} />
      <br />
      <ActualMap
        // style={{ width: "100vw", height: "100vh" }}
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
          title={`${distance <= 50 ? "BullsEye!" : "Congrats!"}`}
          content={`Your position has remained ${roundNumber(
            distance
          )}km close from its actual position.
          ${distance <= 50 ? "It has been a complete SUCCESS." : ""}`}
        />
      </Dialog>
      <Dialog open={showEndGameModal} onClose={handleHideEnd}>
        <Modal
          title={"Game Over"}
          content={`You has managed to place ${successes} cities!`}
        />
      </Dialog>
    </>
  );
};
