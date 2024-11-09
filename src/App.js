import React from 'react';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import CreateUser from './components/CreateUser';
import AddPoints from './components/AddPoints';
import RedeemPoints from './components/RedeemPoints';

function App() {
  return (
    <Provider store={store}>
      <div className="app-container">
      <h1 className="main-title">Loyalty Points System</h1>
        <CreateUser />
        <AddPoints />
        <RedeemPoints />
      </div>
    </Provider>
  );
}

export default App;
