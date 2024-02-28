import React, { useState, useEffect } from 'react';

const Card = ({ card, onClick }) => {
  return (
    <div
      className={`card ${card.isMatched ? 'matched' : card.isFlipped ? 'flipped' : ''}`}
      onClick={() => onClick(card.id)}
    >
      {card.isFlipped || card.isMatched ? card.value : ''}
    </div>
  );
};

const Game = () => {
  const [cards, setCards] = useState([]);
  const [flippedCards, setFlippedCards] = useState([]);

  useEffect(() => {
    initializeGame();
  }, []);

  const initializeGame = () => {
    const symbols = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H']; // Change symbols as needed
    const shuffledSymbols = [...symbols, ...symbols].sort(() => Math.random() - 0.5);
    const initialCards = shuffledSymbols.map((symbol, index) => ({
      id: index,
      value: symbol,
      isFlipped: false,
      isMatched: false,
    }));
    setCards(initialCards);
  };

  const handleCardClick = (cardId) => {
    if (flippedCards.length === 2) {
      return;
    }

    const updatedCards = cards.map((card) =>
      card.id === cardId
        ? { ...card, isFlipped: true }
        : card
    );
    setCards(updatedCards);
    setFlippedCards([...flippedCards, cardId]);

    if (flippedCards.length === 1) {
      const [firstCardId] = flippedCards;
      const [firstCard, secondCard] = cards.filter((card) => card.id === firstCardId || card.id === cardId);
      if (firstCard.value === secondCard.value) {
        const matchedCards = cards.map((card) =>
          card.value === firstCard.value
            ? { ...card, isMatched: true }
            : card
        );
        setCards(matchedCards);
      } else {
        setTimeout(() => {
          const resetCards = cards.map((card) =>
            card.isFlipped ? { ...card, isFlipped: false } : card
          );
          setCards(resetCards);
        }, 1000);
      }
      setFlippedCards([]);
    }
  };

  return (
    <div className="game-container">
      <h1>Memory Game</h1>
      <div className="card-container">
        {cards.map((card) => (
          <Card key={card.id} card={card} onClick={handleCardClick} />
        ))}
      </div>
    </div>
  );
};

export default Game;
