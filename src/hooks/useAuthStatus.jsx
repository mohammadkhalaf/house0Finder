import { auth } from '../firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { useEffect, useState } from 'react';

const useAuthStatus = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [checkStatus, setCheckStatus] = useState(true);
  let isMounted = true;
  useEffect(() => {
    if (isMounted) {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          setLoggedIn(true);
        }
        setCheckStatus(false);
      });
    }

    return () => {
      isMounted = false;
    };
  }, []);

  return { loggedIn, checkStatus };
};

export default useAuthStatus;
