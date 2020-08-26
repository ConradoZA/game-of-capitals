import React, { useState } from "react";
import QuizContext from "./quiz-context";
import { useRefState } from "../data/extraFunctions/customHooks";

export const QuizState = (props) => {
  const [quizLatLng, setQuizLatLng] = useState({});
  const changeQuizLatLng = (newLatLng) => {
    setQuizLatLng(newLatLng);
  };

  const [quizCountry, setQuizCountry] = useState("");
  const changeQuizCountry = (newCountry) => {
    setQuizCountry(newCountry);
  };

  const [quizCapital, setQuizCapital] = useState("");
  const changeQuizCapital = (newCapital) => {
    setQuizCapital(newCapital);
  };

  const [userGuess, setUserGuess] = useState({});
  const changeUserGuess = (newLatLng) => {
    setUserGuess(newLatLng);
  };

  const [userHits, setUserHits] = useState(0);
  const changeUserHits = (newHits) => {
    setUserHits(newHits);
  };

  const [userPoints, setUserPoints] = useRefState(1500);
  const changeUserPoints = (newPoints) => {
    setUserPoints(newPoints);
  };

  const [userQuizDistance, setUserQuizDistance] = useRefState(0);
  const changeUserQuizDistance = (newDistance) => {
    setUserQuizDistance(newDistance);
  };

  return (
    <QuizContext.Provider
      value={{
        quizLatLng,
        quizCapital,
        quizCountry,
        userGuess,
        userHits,
        userPoints,
        userQuizDistance,
        setNewQuizLatLng: changeQuizLatLng,
        setNewCapital: changeQuizCapital,
        setNewCountry: changeQuizCountry,
        setNewGuess: changeUserGuess,
        setNewHits: changeUserHits,
        setNewPoints: changeUserPoints,
        setNewUserQuizDistance: changeUserQuizDistance,
      }}
    >
      {props.children}
    </QuizContext.Provider>
  );
};
