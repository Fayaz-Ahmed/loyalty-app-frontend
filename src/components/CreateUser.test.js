import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import CreateUser from './CreateUser';

const mockStore = configureStore([]);

describe('CreateUser Component', () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      user: { error: null },
    });
  });

  test('renders the Create User form', () => {
    render(
      <Provider store={store}>
        <CreateUser />
      </Provider>
    );

    expect(screen.getByPlaceholderText(/Name/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Email/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Create User/i })).toBeInTheDocument();
  });

  test('shows error message from Redux state', () => {
    store = mockStore({
      user: { error: 'Email is required' },
    });

    render(
      <Provider store={store}>
        <CreateUser />
      </Provider>
    );

    expect(screen.getByText(/Email is required/i)).toBeInTheDocument();
  });

  test('submits the form with name and email', () => {
    render(
      <Provider store={store}>
        <CreateUser />
      </Provider>
    );

    fireEvent.change(screen.getByPlaceholderText(/Name/i), {
      target: { value: 'John Doe' },
    });
    fireEvent.change(screen.getByPlaceholderText(/Email/i), {
      target: { value: 'john@example.com' },
    });
    fireEvent.click(screen.getByRole('button', { name: /Create User/i }));

    const actions = store.getActions();
    expect(actions).toHaveLength(1);
    expect(actions[0].type).toBe('user/createUser/pending');
  });
});
