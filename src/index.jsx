import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';

import './services/firebase/config';

const sevenTech = document.getElementById('seven_tech');

if (sevenTech) {
  ReactDOM.createRoot(sevenTech).render(<React.Fragment><App /></React.Fragment>);
}
