import { useState, useEffect, useCallback } from "react";

const useStoredNick = () => {
  const [nick, setNick] = useState(() => {
    const storedNick = localStorage.getItem("nick");
    return storedNick || "empty";
  });

  useEffect(() => {
    const handleStorageChange = () => {
      const storedNick = localStorage.getItem("nick");
      setNick(storedNick || "empty");
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  const storeNick = useCallback((nick) => {
    if (nick) {
      localStorage.setItem("nick", nick);
      setNick(nick);
    } else {
      console.error("Nick is invalid");
    }
  }, []);

  const removeNick = useCallback(() => {
    localStorage.removeItem("nick");
    setNick("empty");
  }, []);

  return [nick, storeNick, removeNick];
};

export default useStoredNick;
