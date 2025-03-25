import './App.css';
import flashcardData from './flashcarddata.json';
import Flashcard from './components/Flashcard';
import { useState, useEffect } from 'react';

const UNSPLASH_ACCESS_KEY = import.meta.env.VITE_UNSPLASH_ACCESS_KEY;

const App = () => {
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [filteredCards, setFilteredCards] = useState(flashcardData);
  const [cardOrder, setCardOrder] = useState(filteredCards.map(card => card.id)); 
  const [shuffled, setShuffled] = useState(false);
  const [currentCard, setCurrentCard] = useState(null);
  const [backstack, setBackstack] = useState([]);
  const [isFlipped, setIsFlipped] = useState(false); 
  const [guess, setGuess] = useState('');
  const [feedback, setFeedback] = useState('');
  const [currentStreak, setCurrentStreak] = useState(0);
  const [bestStreak, setBestStreak] = useState(0);

  useEffect(() => {
    const cards = selectedCategory === 'All Categories'
      ? flashcardData
      : flashcardData.filter(card => card.category === selectedCategory);

    setFilteredCards(cards);
    setCardOrder(cards.map(card => card.id));
    setCurrentCard(cards[0]);
    setBackstack([]);
    setIsFlipped(false);
    setCurrentStreak(0);
    setFeedback('');
  }, [selectedCategory]);

  const uniqueCategories = ['All Categories', ...new Set(flashcardData.map(card => card.category))];
  
  const handleFlip = () => setIsFlipped(!isFlipped);

  const handleNext = () => {
    const currentIndex = cardOrder.indexOf(currentCard.id);
    const nextIndex = (currentIndex + 1) % cardOrder.length;
    const nextCard = filteredCards.find(card => card.id === cardOrder[nextIndex]);
    setBackstack([...backstack, currentCard]);
    setCurrentCard(nextCard);
    setIsFlipped(false);
    setGuess('');
    setFeedback('');
  };

  const handleBack = () => {
    if (backstack.length > 0) {
      const prevCard = backstack[backstack.length - 1];
      setCurrentCard(prevCard);
      setBackstack(backstack.slice(0, -1));
      setIsFlipped(false);
      setGuess('');
      setFeedback('');
    }
  };

  const handleShuffle = () => {
    const newShuffled = !shuffled;
    setShuffled(newShuffled);
    const shuffledOrder = newShuffled 
      ? [...cardOrder].sort(() => Math.random() - 0.5)
      : filteredCards.map(card => card.id);

    setCardOrder(shuffledOrder);
    setBackstack([]);
    setCurrentCard(filteredCards.find(card => card.id === shuffledOrder[0]));
    setCurrentStreak(0);
    setIsFlipped(false);
    setGuess('');
    setFeedback('');
  };

  const handleReset = () => {
    setBackstack([]);
    handleShuffle();
  };

  // handle user guess input
  const handleGuessChange = (event) => setGuess(event.target.value);

  const handleSubmitGuess = () => {
    if (guess.trim().toLowerCase() === currentCard.back.toLowerCase()) {
      const newStreak = currentStreak + 1;
      setCurrentStreak(newStreak);
      if (newStreak > bestStreak) setBestStreak(newStreak);
      setFeedback(
        newStreak >= 2 
        ? `Awesome! You're on a streak of ${newStreak}!`
        : 'Correct!'
      );
      setIsFlipped(true);
    } else {
      setFeedback('Incorrect. Try again.');
      setCurrentStreak(0);
    }
  };

  const categoryMessage = {
    'Vocabulario español': '¡Practiquemos español!',
    'All Categories': 'Ready, set, learn!'
  };

  return (
    <div className="App">
      
      <div className="header">
        <h1>flashCardio</h1>
        <div className="header-content">
          <h2>{categoryMessage[selectedCategory] || 'Let\'s learn!'}</h2>
          <div className="category-select">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              {uniqueCategories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {currentCard ? (
        <Flashcard card={currentCard} isFlipped={isFlipped} handleFlip={handleFlip} />
      ) : (
        <h2>Loading...</h2>
      )}

      <div className="counter">
        <h3> {backstack.length + 1} out of {filteredCards.length} </h3>
      </div>

      <div className="guess-container">
        <input type="text" value={guess} className="guess-input"
        onChange={handleGuessChange} 
        onKeyPress={(e) => e.key === 'Enter' && handleSubmitGuess(e)}
        placeholder="Your answer here"/>
        <button onClick={handleSubmitGuess}>Submit</button>
      </div>

      <div className="feedback-container">
        <h3>{feedback}</h3>
      </div>

      <div className="button-container">
        <button className={`navbutton ${shuffled ? 'unshuffle' : ''}`} onClick={handleShuffle}>
        {shuffled ? 'Unshuffle' : 'Shuffle'}
        </button>
        {backstack.length > 0 && <button className="navbutton" onClick={handleBack}>Back</button>}
        {backstack.length < flashcardData.length - 1 && (
          <button className="navbutton" onClick={handleNext}>Next</button>
        )}
        {backstack.length > 0 && <button className="navbutton" onClick={handleReset}>Reset</button>}
      </div>

    </div>
  );
};

export default App

