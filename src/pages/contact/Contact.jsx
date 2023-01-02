import { useState, useEffect } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../firebase';
import { toast } from 'react-toastify';
import classes from './contact.module.css';

const Contact = () => {
  const [msg, setMsg] = useState('');
  const [landlord, setLandlord] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const params = useParams();
  useEffect(() => {
    const getLandlord = async () => {
      const docRef = doc(db, 'users', params.id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setLandlord(docSnap.data());
      } else {
        toast.error('Could not get data');
      }
    };
    getLandlord();
  }, [params.id]);
  const onChange = (e) => {
    setMsg(e.target.value);
  };

  return (
    <>
      <main className='pageContainer'>
        <header>
          <h2 className='pageHeader'>Contact landlord</h2>
        </header>
        {landlord !== null && (
          <section>
            <div className={classes.contactLandlord}>
              <p className={classes.landlordName}>
                Contact {landlord?.userName}
              </p>
            </div>

            <form className={classes.messageForm}>
              <div className={classes.messageDiv}>
                <label htmlFor='msg' className={classes.messageLabel}>
                  message
                </label>
                <textarea
                  className={classes.textarea}
                  name='msg'
                  id='msg'
                  value={msg}
                  onChange={onChange}
                ></textarea>
              </div>
              <a
                href={`mailto:${landlord.userEmail}?Subject=${searchParams.get(
                  'listingName',
                )}&body=${msg}`}
                type='button'
              >
                <button className={classes.primaryButton} type='button'>
                  Send
                </button>
              </a>
            </form>
          </section>
        )}
      </main>
    </>
  );
};

export default Contact;
