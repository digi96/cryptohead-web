import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import { store } from './state/index'
import reportWebVitals from './reportWebVitals';
import { DAppProvider, useEtherBalance, useEthers, Config, Polygon, Mumbai } from '@usedapp/core'
import { getDefaultProvider } from 'ethers'

const config: Config = {
  //readOnlyChainId: Mumbai.chainId,
}

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <DAppProvider config = {config}>
    <Provider store={store}>
      <App />
    </Provider>
    </DAppProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
