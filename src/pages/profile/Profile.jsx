import { useEffect, useState } from 'react';
import { signOut, updateProfile, updateEmail } from 'firebase/auth';
import { auth, db } from '../../firebase';
import {
  updateDoc,
  doc,
  collection,
  getDocs,
  query,
  where,
  orderBy,
  deleteDoc,
} from 'firebase/firestore';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import ListingItem from '../../components/listingitem/ListingItem';
import classes from './profile.module.css';
import Loader from '../../components/loader/Loader';

const Profile = () => {
  const [user, setUser] = useState({
    name: auth?.currentUser?.displayName || '',
    email: auth?.currentUser?.email || '',
  });
  const { name, email } = user;
  const [listings, setListings] = useState([]);
  const [changeDetails, setChangeDetails] = useState(false);
  const navigate = useNavigate();
  const logoutHandler = () => {
    signOut(auth);
    navigate('/');
  };
  const updateUser = () => {
    setChangeDetails(!changeDetails);
  };
  const changeHandler = (e) => {
    setUser((prev) => ({
      ...prev,
      [e.target.id]: e.target.value,
    }));
  };
  const submitHandler = async (e) => {
    e.preventDefault();
    if (!changeDetails) {
      try {
        await updateProfile(auth.currentUser, {
          displayName: name,
          email,
        });
        await updateEmail(auth.currentUser, email);
        const userRef = doc(db, 'users', auth.currentUser.uid);
        await updateDoc(userRef, {
          userName: name,
          userEmail: email,
        });
        toast.success('Name has been updated!');
      } catch (error) {
        toast.error('Could not update!');
      }
    }
  };
  useEffect(() => {
    const fetchUserItems = async () => {
      const itemsRef = collection(db, 'listings');
      const q = query(
        itemsRef,
        where('userRef', '==', auth.currentUser.uid),
        orderBy('timestamp', 'desc'),
      );
      const querySnap = await getDocs(q);
      let listings = [];
      querySnap.forEach((doc) => {
        return listings.push({ id: doc.id, ...doc.data() });
      });
      setListings(listings);
    };
    fetchUserItems();
  }, [auth.currentUser.uid]);

  const onDelete = async (listingId) => {
    console.log(listingId);
    if (window.confirm('Are you sure you want to delete?')) {
      await deleteDoc(doc(db, 'listings', listingId));
      const updatedListings = listings.filter(
        (listing) => listing.id !== listingId,
      );
      setListings(updatedListings);
      toast.success('Successfully deleted listing');
    }
  };
  return (
    <>
      <main className='profile'>
        <header className={classes.profileHeader}>
          <h2 className='pageHeader'>my profile</h2>
          <button onClick={logoutHandler} className={classes.logOut}>
            log out
          </button>
        </header>
        <section>
          <form onSubmit={submitHandler} className={classes.profileCard}>
            <input
              type='text'
              value={name}
              id='name'
              onChange={changeHandler}
              disabled={!changeDetails}
              className={`${
                !changeDetails
                  ? `${classes.profileName}`
                  : `${classes.profileNameActive}`
              }`}
            />
            <input
              type='email'
              value={email}
              id='email'
              onChange={changeHandler}
              disabled={!changeDetails}
              className={`${
                !changeDetails
                  ? `${classes.profileName}`
                  : `${classes.profileNameActive}`
              }`}
            />
            <button
              onClick={updateUser}
              className={classes.changePersonalDetails}
            >
              {changeDetails ? 'Done' : 'Update'}
            </button>
          </form>

          <div>
            <Link to='/create' className={classes.createListing}>
              Create Item
            </Link>
          </div>
          <div>
            <ul>
              {listings &&
                listings.map((item) => {
                  return (
                    <ListingItem
                      key={item.id}
                      listing={item}
                      onDelete={() => onDelete(item.id)}
                    />
                  );
                })}
            </ul>
          </div>
        </section>
      </main>
    </>
  );
};

export default Profile;
