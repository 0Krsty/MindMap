import React from 'react';
import ReactDOM from 'react-dom';
import dotenv from 'dotenv';
dotenv.config();
import App from './App';
const mountNode = document.getElementById('root');
ReactDOM.render(<App />, mountNode);