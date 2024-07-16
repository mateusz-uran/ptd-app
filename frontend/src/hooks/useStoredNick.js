import { useState, useEffect, useCallback } from "react";

const useStoredNick = () => {
  const [nick, setNick] = useState("empty");

  useEffect(() => {
    const storedNick = localStorage.getItem("nick");
    if (storedNick) {
      setNick(storedNick);
    }
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
