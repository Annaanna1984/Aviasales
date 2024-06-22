import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/App/App';
import { Provider } from 'react-redux';
import { thunk } from 'redux-thunk';

import { reducer } from './Reducer/reducer';
import { applyMiddleware, legacy_createStore as createStore } from 'redux';

const store = createStore(reducer, {}, applyMiddleware(thunk));

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
    <Provider store={store}>
        <App />
    </Provider>
);
