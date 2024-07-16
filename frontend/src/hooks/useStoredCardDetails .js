import { useState, useEffect, useCallback } from "react";

const useStoredCardDetails = () => {
  const [cardDetails, setCardDetails] = useState({
    cardNumber: "",
    cardId: 0,
  });

  useEffect(() => {
    const storedCardNumber = localStorage.getItem("cardNumber");
    const storedCardId = localStorage.getItem("cardId");
    if (storedCardNumber && storedCardId) {
      setCardDetails({ cardNumber: storedCardNumber, cardId: storedCardId });
    }
  }, []);

  const storeCardDetails = useCallback((cardId, cardNumber) => {
    if (cardNumber && cardId) {
      localStorage.setItem("cardNumber", cardNumber);
      localStorage.setItem("cardId", cardId);
      setCardDetails({ cardNumber, cardId });
    } else {
      console.error("Card number or card ID is invalid");
    }
  }, []);

  const removeCardDetails = useCallback((cardNumber, cardId) => {
    if (cardId !== 0) localStorage.removeItem("cardId");
    if (cardNumber !== "") localStorage.removeItem("cardNumber");
  }, []);

  return [cardDetails, storeCardDetails, removeCardDetails];
};

export default useStoredCardDetails;
