import { useNavigate, useLocation } from 'react-router-dom';
import { MdExplore } from 'react-icons/md';
import { BsFillPersonFill } from 'react-icons/bs';
import { MdOutlineLocalOffer } from 'react-icons/md';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const getRoute = (r) => {
    if (r === location.pathname) {
      return true;
    }
  };

  return (
    <footer>
      <nav>
        <ul>
          <li onClick={() => navigate('/')}>
            <MdExplore fill={getRoute('/') ? 'red' : null} />
            <span className={getRoute('/') ? 'active  listitem' : 'listitem'}>
              Explore
            </span>
          </li>
          <li onClick={() => navigate('/offers')}>
            <MdOutlineLocalOffer fill={getRoute('/offers') ? 'red' : null} />
            <span
              className={getRoute('/offers') ? 'active listitem' : 'listitem'}
            >
              Offers
            </span>
          </li>
          <li onClick={() => navigate('/profile')}>
            <BsFillPersonFill fill={getRoute('/profile') ? 'red' : null} />
            <span
              className={getRoute('/profile') ? 'active listitem' : 'listitem'}
            >
              Profile
            </span>
          </li>
        </ul>
      </nav>
    </footer>
  );
};

export default Navbar;
