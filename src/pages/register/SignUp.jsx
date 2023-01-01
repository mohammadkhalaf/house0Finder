import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth, db } from '../../firebase';
import { toast } from 'react-toastify';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { AiOutlineArrowRight } from 'react-icons/ai';
import { MdVisibility } from 'react-icons/md';
import classes from './register.module.css';

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
    if (userEmail && userPassword && userName) {
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
    }
  };
  return (
    <div className='pageContainer'>
      <h2 className='pageHeader'>Sign up</h2>
      <form>
        <div>
          <input
            className={classes.nameInput}
            type='text'
            placeholder='Your Name'
            id='userName'
            value={userName}
            onChange={onchangeHandler}
          />
        </div>
        <div>
          <input
            className={classes.emailInput}
            type='text'
            placeholder='Your email'
            id='userEmail'
            value={userEmail}
            onChange={onchangeHandler}
          />
        </div>
        <div className={classes.passwordInputDiv}>
          <input
            className={classes.passwordInput}
            type={showPassword ? 'text' : 'password'}
            id='userPassword'
            value={userPassword}
            placeholder='Your password'
            onChange={onchangeHandler}
          />
          <MdVisibility
            onClick={showPasswordHandler}
            className={classes.showPassword}
          />
        </div>
        <Link to='/forgetpassword' className={classes.forgotPasswordLink}>
          Forget password?
        </Link>
        <div className={classes.signInBar}>
          <button className={classes.submitButton} onClick={submitHandler}>
            Sign Up
          </button>
        </div>
      </form>
      <p>You have an account?</p>
      <Link className={classes.registerLink} to='/signin'>
        {' '}
        Sign in{' '}
      </Link>
    </div>
  );
};

export default SignUp;
