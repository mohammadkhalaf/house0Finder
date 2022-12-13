import { useState } from 'react';
import { Link } from 'react-router-dom';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../firebase';
import { toast } from 'react-toastify';

const ForgetPassword = () => {
  const [email, setEmail] = useState('');
  const onchangeHandler = (e) => {
    setEmail(e.target.value);
  };
  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      await sendPasswordResetEmail(auth, email);
      toast.success('Email was sent ');
    } catch (error) {
      toast.error('Could not reset email ');
    }
  };
  return (
    <>
      <div>
        <form onSubmit={submitHandler}>
          <input
            type='email'
            placeholder='Email'
            id='email'
            value={email}
            onChange={onchangeHandler}
          />

          <Link to='/signin'>sign in</Link>
          <button>Reset password</button>
        </form>
      </div>
    </>
  );
};

export default ForgetPassword;
