import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import CommonNav from './Component/CommonNav/CommonNav';
import HomePage from './Component/HomePage/HomePage.jsx'
import WebNavbar from './Component/WebNavbar/WebNavbar';
import Footer from './Component/Footer/Footer'
import Login from './Component/Login/Login';
import Signin from './Component/Signin/Signin';
import AdminPanel from './Component/AdminPanel/AdminPanel';
import AdminProtectedRoute from './Component/AdminPanel/AdminProtectedRoute/AdminProtectedRoute';
import UserAccount from './Component/UserAccount/UserAccount';
import ForgotPassword from './Component/ForgotPassword/ForgotPassword';
import ProductPage from './Component/ProductPage/ProductPage';
import AddToCart from './Component/AddToCart/AddToCart';

import { Provider } from 'react-redux'
import Store from './Store/Store'

function App() {
  return (
    <div className="App">
      <Provider store={Store}>
        <BrowserRouter>
          <CommonNav />
          <WebNavbar />
          <Routes>
            <Route exact path='/' element={<HomePage />}></Route>
            <Route exact path='/login' element={<Login />}></Route>
            <Route exact path='/signin' element={<Signin />}></Route>
            <Route exact path='/admin' element={
              <>
                <AdminProtectedRoute>
                  <AdminPanel />
                </AdminProtectedRoute>
              </>
            }></Route>
            <Route exact path='/account' element={<UserAccount />}></Route>
            <Route exact path="/forgotPassword" element={<ForgotPassword />}></Route>
            <Route exact path="/productpage" element={<ProductPage />}></Route>
            <Route exact path="/addtocart" element={<AddToCart />}></Route>
          </Routes>
          <Footer />
        </BrowserRouter>
      </Provider>
    </div>
  );
}

export default App;
