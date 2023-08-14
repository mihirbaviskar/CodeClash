import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'

// pages & components
import Problem from './pages/Problem';
import NavBar from './components/NavBar';
import {io} from 'socket.io-client';
import { useEffect } from 'react';
import { SocketContext } from './context/SocketContext';

import { UserContextProvider } from './context/UserContext';
import WaitingRoom from './pages/WaitingRoom';
import { RoomContextProvider } from './context/RoomContext';

import LandingPage from './pages/LandingPage';
import Finish from './pages/Finish';

import LearnMore from './pages/LearnMore'
import { MessageContextProvider } from './context/MessageContext';

if(process.env.REACT_APP_DEBUG === 'false'){
  console.log = function() {}
}

const socket = io.connect(process.env.REACT_APP_BACKEND_URL);


function App() {
  useEffect(() => {
    console.log(socket);
    socket.emit("send message", "A new user has joined");
    socket.on("receive message", (message) => {
      console.log(message);
    });
    return () => {
      socket.off('receive message');
    };
  }, [])

  return (
    <div className="App">
      <BrowserRouter>
       <NavBar/>
        <div className="pages">
          <SocketContext.Provider value = {socket}>
            <UserContextProvider>
              <RoomContextProvider>
              <MessageContextProvider>
                <Routes>
                    <Route 
                      path = '/problem'
                      element={<Problem/>}
                    />
                  <Route
                    path = '/'
                    element={<LandingPage/>
                  }
                  />
                  <Route
                    path = '/waitingroom'
                    element={<WaitingRoom/>}
                  />
                  <Route
                    path = '/finish'
                    element={
                     <Finish/>
                    }/>
                    <Route
                    path = '/learn-more'
                    element={
                      <LearnMore/>
                    }/>
                    <Route
                    path = '/*'
                    element={
                      <div>404 Not Found</div>
                    }/>
                </Routes>
                </MessageContextProvider>
              </RoomContextProvider>
            </UserContextProvider>
          </SocketContext.Provider>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;