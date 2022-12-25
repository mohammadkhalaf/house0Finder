import { useState } from 'react';
import { Link } from 'react-router-dom';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../../firebase';
import { toast } from 'react-toastify';
import classes from './register.module.css';

const ForgetPassword = () => {
  const [email, setEmail] = useState('');
  const onchangeHandler = (e) => {
    setEmail(e.target.value);
  };
  const submitHandler = async (e) => {
    e.preventDefault();
    if (email) {
      try {
        await sendPasswordResetEmail(auth, email);
        toast.success('Email was sent ');
      } catch (error) {
        toast.error('Could not reset email ');
      }
    }
  };
  return (
    <>
      <div className='pageContainer'>
        <h2 className='pageHeader'>Forgot password</h2>
        <form onSubmit={submitHandler}>
          <div>
            <input
              className={classes.emailInput}
              type='email'
              placeholder='Email'
              id='email'
              value={email}
              onChange={onchangeHandler}
            />
          </div>

          <Link to='/signin' className={classes.forgotPasswordLink}>
            sign in
          </Link>
          <div className={classes.signInBar}>
            <button className={classes.submitButton}>Reset password</button>
          </div>
        </form>
      </div>
    </>
  );
};

export default ForgetPassword;
