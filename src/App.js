import React from 'react';
import { Provider } from 'react-redux';
import ReduxThunk from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';
import reducers from './reducers';
import './App.css';
import { MainRouter } from './Router';

function App() {
  const store = createStore(reducers, {}, applyMiddleware(ReduxThunk));
  return (
    <Provider store={store}>
        <MainRouter />;
    </Provider>
  );
}

export default App;
