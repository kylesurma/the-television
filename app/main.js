import React from 'react';
import ReactDOM from 'react-dom';
import App from './App'
import { Provider } from 'react-redux'
import store from './store'


console.log(window.screen)

// window.resizeTo(
//   window.screen.availWidth / 2,
//   window.screen.availHeight / 2
// );

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('app')
);
