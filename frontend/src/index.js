import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { UserContextProvider } from './context/UserContext';
import { RoomContextProvider } from './context/RoomContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <UserContextProvider>
        <RoomContextProvider>
            <App />
        </RoomContextProvider>
    </UserContextProvider>
    
);

