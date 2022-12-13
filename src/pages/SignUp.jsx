import { useState } from 'react';
import { Link } from 'react-router-dom';
import { AiOutlineArrowRight } from 'react-icons/ai';
import { MdVisibility } from 'react-icons/md';

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [signupForm, setSignupForm] = useState({
    userEmail: '',
    userPassword: '',
    userName: '',
  });
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
        <button>
          Sign Up <AiOutlineArrowRight />
        </button>
      </form>
      <p>You have an account?</p>
      <Link to='/signin'> Sign in </Link>
    </div>
  );
};

export default SignUp;
