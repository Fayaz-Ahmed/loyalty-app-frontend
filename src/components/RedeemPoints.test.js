import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import RedeemPoints from './RedeemPoints';

const mockStore = configureStore([]);

describe('RedeemPoints Component', () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      user: { error: null },
    });
  });

  test('renders the Redeem Points form', () => {
    render(
      <Provider store={store}>
        <RedeemPoints />
      </Provider>
    );

    expect(screen.getByPlaceholderText(/User Email/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Points/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Redeem Points/i })).toBeInTheDocument();
  });

  test('shows error message from Redux state', () => {
    store = mockStore({
      user: { error: 'Insufficient points' },
    });

    render(
      <Provider store={store}>
        <RedeemPoints />
      </Provider>
    );

    expect(screen.getByText(/Insufficient points/i)).toBeInTheDocument();
  });

  test('submits the form with email and points', () => {
    render(
      <Provider store={store}>
        <RedeemPoints />
      </Provider>
    );

    fireEvent.change(screen.getByPlaceholderText(/User Email/i), {
      target: { value: 'john@example.com' },
    });
    fireEvent.change(screen.getByPlaceholderText(/Points/i), {
      target: { value: '5' },
    });
    fireEvent.click(screen.getByRole('button', { name: /Redeem Points/i }));

    const actions = store.getActions();
    expect(actions).toHaveLength(1);
    expect(actions[0].type).toBe('user/redeemPoints/pending');
  });
});
