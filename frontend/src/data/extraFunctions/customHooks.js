import { useState, useRef } from "react";

export const useAsyncState = (
  value,
  isProp = false,
  notRenderIfEqual = true
) => {
  const ref = useRef(value);
  const [, forceRender] = useState(false);

  const updateState = (newState) => {
    if (notRenderIfEqual && !Object.is(ref.current, newState)) {
      ref.current = newState;
      forceRender((oldState) => !oldState);
    }
  };

  if (isProp) {
    ref.current = value;
    return ref;
  }

  return [ref, updateState];
};
