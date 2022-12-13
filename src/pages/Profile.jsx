import { useEffect, useState } from 'react';
import { signOut, updateProfile, updateEmail } from 'firebase/auth';
import { auth, db } from '../firebase';
import { updateDoc, doc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Profile = () => {
  const [user, setUser] = useState({
    name: auth?.currentUser?.displayName || '',
    email: auth?.currentUser?.email || '',
  });
  const { name, email } = user;
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
      } catch (error) {
        toast.error('Could not update!');
      }
    }
  };
  return (
    <>
      <div>my profile</div>
      <button onClick={logoutHandler}>log out</button>
      <section>
        <form onSubmit={submitHandler}>
          <input
            type='text'
            value={name}
            id='name'
            onChange={changeHandler}
            disabled={!changeDetails}
          />
          <input
            type='email'
            value={email}
            id='email'
            onChange={changeHandler}
            disabled={!changeDetails}
          />
          <button onClick={updateUser}>
            {changeDetails ? 'Done' : 'Update'}
          </button>
        </form>
      </section>
    </>
  );
};

export default Profile;
