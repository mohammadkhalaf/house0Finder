import { useState, useEffect } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { toast } from 'react-toastify';

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
  }, []);
  const onChange = (e) => {
    setMsg(e.target.value);
  };

  return (
    <>
      <main>
        <p>Contact landlord</p>
        {landlord !== null && (
          <form>
            <div>
              <label htmlFor='msg'>message</label>
              <textarea
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
              send
            </a>
          </form>
        )}
      </main>
    </>
  );
};

export default Contact;
