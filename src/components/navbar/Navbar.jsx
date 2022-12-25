import { useNavigate, useLocation } from 'react-router-dom';
import { MdExplore } from 'react-icons/md';
import { BsFillPersonFill } from 'react-icons/bs';
import { MdOutlineLocalOffer } from 'react-icons/md';
import classes from './navbar.module.css'

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const getRoute = (r) => {
    if (r === location.pathname) {
      return true;
    }
  };

  return (
    <header className={classes.navbar}>
      <nav className={classes.navbarNav}>
        <ul className={classes.navbarListItems}>
          <li onClick={() => navigate('/')} className={classes.navbarListItem}>
            <MdExplore fill={getRoute('/') ? '#FEBB00' :'#ffffff'} />
            <span className={getRoute('/') ? `${classes.navbarListItemNameActive}` :`${classes.navbarListItemName}`}>
              Explore
            </span>
          </li>
          <li onClick={() => navigate('/offers')} className={classes.navbarListItem}>
            <MdOutlineLocalOffer fill={getRoute('/offers') ? '#FEBB00' : '#ffffff'} />
            <span
              className={getRoute('/offers') ? `${classes.navbarListItemNameActive}`: `${classes.navbarListItemName}`}
            >
              Offers
            </span>
          </li>
          <li onClick={() => navigate('/profile')} className={classes.navbarListItem}>
            <BsFillPersonFill fill={getRoute('/profile') ? '#FEBB00' : '#ffffff'} />
            <span
              className={getRoute('/profile') ? `${classes.navbarListItemNameActive}` : `${classes.navbarListItemName}`}
            >
              Profile
            </span>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
