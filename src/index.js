import React from 'react';
import ReactDOM from 'react-dom/client'
import MainLayout from './Shared/MainLayout';
import LoginLayout from './Shared/LoginLayout'
import App from './App';
import './index.css'
// const element = <h1>Hello Lee!</h1>;

// ReactDOM.createRoot(<MainLayout/>, document.getElementById('root'));
const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    <React.StrictMode>
        <App/>
    </React.StrictMode>
);

