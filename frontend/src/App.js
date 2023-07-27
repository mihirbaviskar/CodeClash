import { BrowserRouter, Routes, Route } from 'react-router-dom'

// pages & components
import Problem from './pages/Problem';
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <div className="pages">
          <Routes>
            <Route 
              path = '/'
              element={<Problem difficulty="easy"/>}
            />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;