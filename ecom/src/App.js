import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import CommonNav from './Component/CommonNav/CommonNav';
import HomePage from './Component/HomePage/HomePage.jsx'
import WebNavbar from './Component/WebNavbar/WebNavbar';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <CommonNav />
      <WebNavbar />
        <Routes>
          <Route exact path='/' element={<HomePage />}>
          
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
