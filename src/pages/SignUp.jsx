import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth, db } from '../firebase';
import { toast } from 'react-toastify';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { AiOutlineArrowRight } from 'react-icons/ai';
import { MdVisibility } from 'react-icons/md';

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [signupForm, setSignupForm] = useState({
    userEmail: '',
    userPassword: '',
    userName: '',
  });
  const navigate = useNavigate();
  const { userEmail, userPassword, userName } = signupForm;
  const onchangeHandler = (e) => {
    setSignupForm((prev) => ({
      ...prev,
      [e.target.id]: e.target.value,
    }));
  };
  const showPasswordHandler = () => {
    setShowPassword(!showPassword);
  };
  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const userCred = await createUserWithEmailAndPassword(
        auth,
        userEmail,
        userPassword,
      );
      const user = userCred.user;
      updateProfile(auth.currentUser, {
        displayName: userName,
      });
      const copyData = { ...signupForm };
      delete copyData.userPassword;
      copyData.timestamp = serverTimestamp();
      await setDoc(doc(db, 'users', user.uid), copyData);
      navigate('/');
    } catch (error) {
      toast.error('Something went wrong');
    }
  };
  return (
    <div>
      <h2>welcome back</h2>
      <form>
        <input
          type='text'
          placeholder='Your Name'
          id='userName'
          value={userName}
          onChange={onchangeHandler}
        />
        <input
          type='text'
          placeholder='Your email'
          id='userEmail'
          value={userEmail}
          onChange={onchangeHandler}
        />
        <input
          type={showPassword ? 'text' : 'password'}
          id='userPassword'
          value={userPassword}
          placeholder='Your password'
          onChange={onchangeHandler}
        />
        <MdVisibility onClick={showPasswordHandler} />
        <Link to='/forgetpassword'>Forget password?</Link>
        <button onClick={submitHandler}>
          Sign Up <AiOutlineArrowRight />
        </button>
      </form>
      <p>You have an account?</p>
      <Link to='/signin'> Sign in </Link>
    </div>
  );
};

export default SignUp;
