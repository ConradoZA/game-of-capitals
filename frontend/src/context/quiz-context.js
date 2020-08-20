import { createContext } from "react";

export default createContext({
  quizLatLng: {},
  quizCapital: "",
  quizCountry: "",
  userGuess: {},
  userHits: 0,
  userPoints: 1500,
  userQuizDistance: 0,
  setNewQuizLatLng: (newLatLng) => {},
  setNewCapital: (newCapital) => {},
  setNewCountry: (newCountry) => {},
  setNewGuess: (newLatLng) => {},
  setNewHits: (newHits) => {},
  setNewPoints: (newPoints) => {},
  setNewUserQuizDistance: (newDistance) => {},
});
