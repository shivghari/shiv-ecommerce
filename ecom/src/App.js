import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import CommonNav from './Component/CommonNav/CommonNav';
import HomePage from './Component/HomePage/HomePage.jsx'
import WebNavbar from './Component/WebNavbar/WebNavbar';
import Footer from './Component/Footer/Footer'
import Login from './Component/Login/Login';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <CommonNav />
      <WebNavbar />
        <Routes>
          <Route exact path='/' element={<HomePage />}></Route>
          <Route exact path='/login' element={<Login />}></Route>
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
