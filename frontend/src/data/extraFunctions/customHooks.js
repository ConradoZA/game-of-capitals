import { useState, useRef } from "react";

export const useRefState = (value, notRenderIfEqual = true) => {
  const ref = useRef(value);
  const [, forceRender] = useState(false);

  const updateState = (newState) => {
    if (notRenderIfEqual && !Object.is(ref.current, newState)) {
      ref.current = newState;
      forceRender((oldState) => !oldState);
    } else {
      ref.current = newState;
    }
  };

  return [ref, updateState];
};
