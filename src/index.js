import React from 'react';
import ReactDOM from 'react-dom';
import Layout from './Components/Layout';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import store from './Components/Redux/store';
import './index.css';

ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
      <BrowserRouter>
        <Layout />
      </BrowserRouter>
    </React.StrictMode>
  </Provider>,
  document.getElementById('root')
);
