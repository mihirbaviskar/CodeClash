import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'

// pages & components
import Problem from './pages/Problem';
import NavBar from './components/NavBar';
import {io} from 'socket.io-client';
import { useEffect } from 'react';
import { useContext } from 'react';
import { useState } from 'react';

import { SocketContext } from './context/SocketContext';
import { UserContext } from './context/UserContext';
import {RoomContext} from './context/RoomContext';
import { MessageContextProvider } from './context/MessageContext';

import WaitingRoom from './pages/WaitingRoom';
import LandingPage from './pages/LandingPage';
import Finish from './pages/Finish';
import LearnMore from './pages/LearnMore'
import LoadingSpinner from './components/LoadingSpinner';

if(process.env.REACT_APP_DEBUG === 'false'){
  console.log = function() {}
}

const socket = io.connect(process.env.REACT_APP_BACKEND_URL);

function App() {
  const {user_actual, dispatch: userDispatch} = useContext(UserContext);
  const {room_actual, dispatch: roomDispatch} = useContext(RoomContext);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    const storedUserId = localStorage.getItem('userId');
    if(storedUserId){
      console.log("returning user: ", storedUserId);
      socket.emit("reconnect-user", {userId: storedUserId});

      socket.on("reconnect-user-success", ({user, room}) => {
        console.log("reconnect success");
        userDispatch({
          type: 'SET_USER',
          payload:user
        });
        roomDispatch({
          type:'SET_ROOM',
          payload:room
        });
      });
      socket.on("reconnect-user-failure", (error) => {
        console.log("reconnect fail");
        localStorage.clear();
      });
    }
      setLoading(false);
  }, []);
  useEffect(() => {
    console.log(socket.id);
    socket.emit("send message", "A new user has joined");
  }, [])

  return (
    <div className="App">
      <BrowserRouter>
       <NavBar/>
        <div className={loading ? "loading-background-element" : "pages"}>
          <SocketContext.Provider value = {socket}>
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
          </SocketContext.Provider>
        </div>
        {loading && <LoadingSpinner/>}
      </BrowserRouter>
    </div>
  );
}

export default App;