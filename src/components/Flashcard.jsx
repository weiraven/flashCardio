import { useState, useEffect } from 'react';

const UNSPLASH_ACCESS_KEY = import.meta.env.VITE_UNSPLASH_ACCESS_KEY;

const Flashcard = ({ card, isFlipped, handleFlip }) => {
  const [imageUrl, setImageUrl] = useState('');
  const [imageAuthor, setImageAuthor] = useState('');
  const [imageAuthorLink, setImageAuthorLink] = useState('');
  const [imageLink, setImageLink] = useState('');

  useEffect(() => {
    const fetchImage = async () => {
      const res = await fetch(
        `https://api.unsplash.com/photos/random?query=${encodeURIComponent(card.back)}&client_id=${UNSPLASH_ACCESS_KEY}`
      );
      if (res.ok) {
        const data = await res.json();
        setImageUrl(data.urls.regular);
        setImageAuthor(data.user.name);
        setImageAuthorLink(data.user.links.html);
        setImageLink(data.links.html);
      } else {
        setImageUrl('');
      }
    };
    fetchImage().catch(e => {
      console.error('Error fetching image:', e);
      setImageUrl('');
    });
  }, [card]);

  return (
    <>
      <div className="flashcard-container">
        <div className="flashcard" onClick={handleFlip}>
          <div className={`flashcard-inner ${isFlipped ? "flipped" : ""}`}>
            <div
              className="front"
              style={{
                backgroundImage: imageUrl ? `url(${imageUrl})` : 'none',
                backgroundSize: 'cover',
                backgroundPosition: 'center'
              }}
            >
              <h2>{card.front}</h2>
              {!imageUrl && <div className="no-image-placeholder"></div>}
            </div>
            <div className="back">
              <h2>{card.back}</h2>
            </div>
          </div>
        </div>
      </div>

      {imageUrl && imageAuthor && (
        <div className="image-attribution">
          <small>
            <a href={imageLink} target="_blank" rel="noopener noreferrer">Photo</a> by{' '}
            <a href={imageAuthorLink} target="_blank" rel="noopener noreferrer">{imageAuthor}</a>{' '}
            on <a href="https://unsplash.com" target="_blank" rel="noopener noreferrer">Unsplash</a>
          </small>
        </div>
      )}
    </>
  );
};

export default Flashcard;
