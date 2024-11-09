import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addPoints } from '../redux/userSlice';

const AddPoints = () => {
  const [email, setEmail] = useState('');
  const [points, setPoints] = useState(0);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccessMessage('');
    setErrorMessage('');

    try {
      await dispatch(addPoints({ email, points: parseInt(points) })).unwrap();
      setSuccessMessage(`Successfully added ${points} points to ${email}!`);
      setPoints(0);
      setEmail('');
    } catch (error) {
      setErrorMessage(error || 'Failed to add points. Please check the email or try again.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form">
      <h2>Add Points</h2>
      <input
        type="email"
        placeholder="User Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
        type="number"
        placeholder="Points"
        value={points}
        onChange={(e) => setPoints(e.target.value)}
        required
      />
      <button type="submit">Add Points</button>
      {successMessage && <p className="success">{successMessage}</p>}
      {errorMessage && <p className="error">{errorMessage}</p>}
    </form>
  );
};

export default AddPoints;
