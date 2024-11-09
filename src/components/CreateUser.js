import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createUser } from '../redux/userSlice';

const CreateUser = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccessMessage('');
    setErrorMessage('');

    try {
      await dispatch(createUser({ name, email })).unwrap();
      setSuccessMessage('User created successfully!');
      setName('');
      setEmail('');
    } catch (error) {
      setErrorMessage('Failed to create user. Please try again.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form">
      <h2>Create User</h2>
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <button type="submit">Create User</button>
      {successMessage && <p className="success">{successMessage}</p>}
      {errorMessage && <p className="error">{errorMessage}</p>}
    </form>
  );
};

export default CreateUser;
