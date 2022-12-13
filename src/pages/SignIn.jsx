import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AiOutlineArrowRight } from 'react-icons/ai';
import { MdVisibility } from 'react-icons/md';

const SignIn = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [signinForm, setSigninForm] = useState({
    userEmail: '',
    userPassword: '',
  });
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
        <button>
          Sign in <AiOutlineArrowRight />
        </button>
      </form>
      <p>Do not have an account?</p>
      <Link to='/signup'> Sin up </Link>
    </div>
  );
};

export default SignIn;
