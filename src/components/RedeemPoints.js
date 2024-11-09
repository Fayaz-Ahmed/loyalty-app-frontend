import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { redeemPoints } from '../redux/userSlice';

const RedeemPoints = () => {
  const [email, setEmail] = useState('');
  const [points, setPoints] = useState(0);
  const [successMessage, setSuccessMessage] = useState('');
  const dispatch = useDispatch();
  const errorMessage = useSelector((state) => state.user.error);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccessMessage(''); // Clear success message at the beginning of submission

    try {
      await dispatch(redeemPoints({ email, points: parseInt(points) })).unwrap();
      setSuccessMessage(`Successfully redeemed ${points} points from ${email}!`);
      setPoints(0); // Reset points input field
      setEmail(''); // Reset email input field
    } catch (error) {
      // Error message will be set in Redux state and displayed via errorMessage
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form">
      <h2>Redeem Points</h2>
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
      <button type="submit">Redeem Points</button>
      {successMessage && <p className="success">{successMessage}</p>}
      {errorMessage && <p className="error">{errorMessage}</p>}
    </form>
  );
};

export default RedeemPoints;
