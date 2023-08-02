import { BrowserRouter, Routes, Route } from 'react-router-dom'

// pages & components
import Problem from './pages/Problem';
import NavBar from './components/NavBar';
import {io} from 'socket.io-client';
import { useEffect } from 'react';
import { SocketContext } from './context/SocketContext';
import JoinRoom from './components/JoinRoom';
import CreateRoom from './components/CreateRoom';
import { UserContextProvider } from './context/UserContext';
import WaitingRoom from './pages/WaitingRoom';
import { RoomContextProvider } from './context/RoomContext';
const socket = io.connect("http://localhost:4000");
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
                <Routes>
                  <Route 
                    path = '/problem'
                    element={<Problem difficulty={["easy", "medium", "hard"]}/>}
                  />
                  <Route 
                    path = '/'
                    element={
                    <>
                      <CreateRoom/>
                      <JoinRoom/>
                    </>
                  }
                  />
                  <Route 
                    path = '/waitingroom'
                    element={<WaitingRoom/>}
                  />
                </Routes>
              </RoomContextProvider>
            </UserContextProvider>
          </SocketContext.Provider>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;