import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Explore from './pages/Explore';
import Profile from './pages/Profile';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import ForgetPassword from './pages/ForgetPassword';
import Offers from './pages/Offers';
import PrivateRoute from './components/PrivateRoute';
import Category from './pages/Category';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import CreateItem from './pages/CreateItem';

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path='/' element={<Explore />} />
          <Route path='/profile' element={<PrivateRoute />}>
            <Route path='/profile' element={<Profile />} />
          </Route>
          <Route path='/signin' element={<SignIn />} />
          <Route path='/signup' element={<SignUp />} />
          <Route path='/offers' element={<Offers />} />
          <Route path='/create' element={<CreateItem />} />
          <Route path='/category/:type' element={<Category />} />
          <Route path='/forgetpassword' element={<ForgetPassword />} />
        </Routes>
      </Router>
      <ToastContainer />
    </>
  );
}

export default App;
