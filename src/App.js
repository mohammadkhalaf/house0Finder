import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/navbar/Navbar';
import Explore from './pages/explore/Explore';
import Profile from './pages/profile/Profile';
import SignIn from './pages/register/SignIn';
import SignUp from './pages/register/SignUp';
import ForgetPassword from './pages/register/ForgetPassword';
import Offers from './pages/Offers';
import PrivateRoute from './components/PrivateRoute';
import Category from './pages/category/Category';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CreateItem from './pages/create/CreateItem';
import ListingPage from './pages/listingpage/ListingPage';
import Contact from './pages/contact/Contact';
import NotFound from './pages/NotFound';
import './App.css';

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
          <Route path='/contact/:id/' element={<Contact />} />
          <Route path='/category/:type' element={<Category />} />
          <Route path='/category/:type/:id' element={<ListingPage />} />

          <Route path='/forgetpassword' element={<ForgetPassword />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </Router>
      <ToastContainer />
    </>
  );
}

export default App;
