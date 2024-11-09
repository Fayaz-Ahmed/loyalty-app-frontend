import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import AddPoints from './AddPoints';

const mockStore = configureStore([]);

describe('AddPoints Component', () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      user: { error: null },
    });
  });

  test('renders the Add Points form', () => {
    render(
      <Provider store={store}>
        <AddPoints />
      </Provider>
    );

    expect(screen.getByPlaceholderText(/User Email/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Points/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Add Points/i })).toBeInTheDocument();
  });

  test('shows error message from Redux state', () => {
    store = mockStore({
      user: { error: 'User not found' },
    });

    render(
      <Provider store={store}>
        <AddPoints />
      </Provider>
    );

    expect(screen.getByText(/User not found/i)).toBeInTheDocument();
  });

  test('submits the form with email and points', () => {
    render(
      <Provider store={store}>
        <AddPoints />
      </Provider>
    );

    fireEvent.change(screen.getByPlaceholderText(/User Email/i), {
      target: { value: 'john@example.com' },
    });
    fireEvent.change(screen.getByPlaceholderText(/Points/i), {
      target: { value: '10' },
    });
    fireEvent.click(screen.getByRole('button', { name: /Add Points/i }));

    const actions = store.getActions();
    expect(actions).toHaveLength(1);
    expect(actions[0].type).toBe('user/addPoints/pending');
  });
});
