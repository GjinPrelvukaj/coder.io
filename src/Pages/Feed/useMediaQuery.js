// useMediaQuery.js
import { useState, useEffect } from "react";

export function useMediaQuery(query) {
  const [matches, setMatches] = useState(
    () => window.matchMedia(query).matches
  );

  useEffect(() => {
    const mediaQuery = window.matchMedia(query);

    const handleMatchChange = (event) => {
      setMatches(event.matches);
    };

    mediaQuery.addListener(handleMatchChange);
    setMatches(mediaQuery.matches);

    return () => {
      mediaQuery.removeListener(handleMatchChange);
    };
  }, [query]);

  return matches;
}
