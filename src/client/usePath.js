import { useCallback, useEffect, useState } from "react";

export function usePath(initialState) {
  const [path, setPath] = useState(initialState);

  const handleKeyUp = useCallback(({ key }) => {
    const keyMap = {
      ArrowUp: "n",
      ArrowLeft: "w",
      ArrowDown: "s",
      ArrowRight: "e",
      // w: "n",
      // a: "w",
      // s: "s",
      // d: "e",
    };
    const direction = keyMap[key];
    if (direction) {
      setPath((state) => [...state, direction]);
    }
  }, []);

  useEffect(() => {
    window.addEventListener("keyup", handleKeyUp);
    return () => {
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [handleKeyUp]);

  return [path, setPath];
}
