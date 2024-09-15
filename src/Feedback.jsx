import React, { useState } from 'react';

function Feedback() {
  const [feedbacks, setFeedbacks] = useState([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [sortBy, setSortBy] = useState('newest');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !email || rating === 0 || !comment) {
      alert('Visi laukeliai turi būti užpildyti');
      return;
    }

    const newFeedback = {
      name,
      email,
      rating,
      comment,
      date: new Date(),
    };

    setFeedbacks([newFeedback, ...feedbacks]);
    setName('');
    setEmail('');
    setRating(0);
    setComment('');
  };

  const calculateAverageRating = () => {
    if (feedbacks.length === 0) return 0;
    const total = feedbacks.reduce((sum, feedback) => sum + feedback.rating, 0);
    return (total / feedbacks.length).toFixed(1);
  };

  const sortFeedbacks = (feedbackList) => {
    switch (sortBy) {
      case 'newest':
        return [...feedbackList].sort((a, b) => new Date(b.date) - new Date(a.date));
      case 'oldest':
        return [...feedbackList].sort((a, b) => new Date(a.date) - new Date(b.date));
      case 'highest':
        return [...feedbackList].sort((a, b) => b.rating - a.rating);
      case 'lowest':
        return [...feedbackList].sort((a, b) => a.rating - b.rating);
      default:
        return feedbackList;
    }
  };

  return (
    <div className="container">
      <h2>Vidutinis vertinimas: {calculateAverageRating()} ★</h2>

      <label class='rus'>Rūšiuoti pagal:</label>
      <select class='rin' value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
        <option value="newest">Naujausi viršuje</option>
        <option value="oldest">Seniausi viršuje</option>
        <option value="highest">Geriausiai vertinami</option>
        <option value="lowest">Blogiausiai vertinami</option>
      </select>

      <h2>Palikite atsiliepimą</h2>
      <form onSubmit={handleSubmit} class='forma'>
        <input 
          type="text"
          placeholder="Vardas"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input 
          type="email"
          placeholder="El. paštas"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="number"
          min="1"
          max="5"
          placeholder="Vertinimas (1-5)"
          value={rating}
          onChange={(e) => setRating(Number(e.target.value))}
        />
        <textarea class='rasyt'
          placeholder="Atsiliepimas"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
        <button type="submit">Pateikti</button>
      </form>

      <h2>Atsiliepimų sąrašas</h2>
      {sortFeedbacks(feedbacks).length > 0 ? (
        sortFeedbacks(feedbacks).map((feedback, index) => (
          <div key={index}>
            <h3>{feedback.name}</h3>
            <p>{feedback.comment}</p>
            <p>Vertinimas: {feedback.rating} ★</p>
            <p>Pateikta: {feedback.date.toLocaleDateString()} {feedback.date.toLocaleTimeString()}</p>
          </div>
        ))
      ) : (
        <p>Nėra atsiliepimų.</p>
      )}
    </div>
  );
}

export default Feedback;
