import React, { useState } from "react";
import SetupContext from "./setup-context";

export const SetupState = (props) => {
  const [difficulty, setDifficulty] = useState("normal");
  const changeDifficulty = (newDifficulty) => {
    setDifficulty(newDifficulty);
  };

  const [continent, setContinent] = useState(3);
  const changeContinent = (newContinent) => {
    setContinent(newContinent);
  };

  return (
    <SetupContext.Provider
      value={{
        difficulty,
        continent,
        setNewDifficulty: changeDifficulty,
        setNewContinent: changeContinent,
      }}
    >
      {props.children}
    </SetupContext.Provider>
  );
};
