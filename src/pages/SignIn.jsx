import { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
import { AiOutlineArrowRight } from 'react-icons/ai';
import { MdVisibility } from 'react-icons/md';

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
  };
  return (
    <div>
      <h2>welcome back</h2>
      <form>
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
          Sign in <AiOutlineArrowRight />
        </button>
      </form>
      <p>Do not have an account?</p>
      <Link to='/signup'> Sin up </Link>
    </div>
  );
};

export default SignIn;
