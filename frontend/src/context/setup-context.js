import { createContext } from "react";

export default createContext({
  difficulty: "normal",
  continent: 3,
  setNewDifficulty: (newDifficulty) => {},
  setNewContinent: (newContinent) => {},
});
