import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './Components/App/App';

const ele = document.querySelector('.root');
const root = ReactDOM.createRoot(ele);
root.render(
    <App />
);