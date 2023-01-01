import { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase';
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
import { MdVisibility } from 'react-icons/md';
import classes from './register.module.css';

const SignIn = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [signinForm, setSigninForm] = useState({
    userEmail: '',
    userPassword: '',
  });

  const navigate = useNavigate();
  const { userEmail, userPassword } = signinForm;
  const onchangeHandler = (e) => {
    setSigninForm((prev) => ({
      ...prev,
      [e.target.id]: e.target.value,
    }));
  };
  const showPasswordHandler = () => {
    setShowPassword(!showPassword);
  };
  const submitHandler = async (e) => {
    e.preventDefault();
    if (userEmail && userPassword) {
      try {
        const userCred = await signInWithEmailAndPassword(
          auth,
          userEmail,
          userPassword,
        );
        if (userCred.user) {
          navigate('/');
        }
      } catch (error) {
        toast.error('Bad user credentials');
      }
    }
  };
  return (
    <div className='pageContainer'>
      <h2 className='pageHeader'>welcome back</h2>
      <form>
        <input
          className={classes.emailInput}
          type='text'
          placeholder='Your email'
          id='userEmail'
          value={userEmail}
          onChange={onchangeHandler}
        />
        <div className={classes.passwordInputDiv}>
          <input
            type={showPassword ? 'text' : 'password'}
            className={classes.passwordInput}
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
            Sign in
          </button>
        </div>
      </form>
      <p>Do not have an account?</p>
      <Link className={classes.registerLink} to='/signup'>
        Sin up
      </Link>
    </div>
  );
};

export default SignIn;
