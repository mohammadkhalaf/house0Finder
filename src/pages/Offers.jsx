import { useEffect, useState } from 'react';
import {
  collection,
  query,
  where,
  getDocs,
  orderBy,
  limit,
  startAfter,
} from 'firebase/firestore';
import ListingItem from '../components/listingitem/ListingItem';
import Loader from '../components/loader/Loader';
import { db } from '../firebase';

const Offers = () => {
  const [listings, setListings] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchListings = async () => {
      setLoading(true);
      try {
        const q = query(
          collection(db, 'listings'),
          where('offer', '==', true),
          orderBy('timestamp', 'desc'),
          limit(2),
        );
        const querySnapshot = await getDocs(q);
        let listings = [];
        querySnapshot.forEach((doc) => {
          return listings.push({ id: doc.id, ...doc.data() });
        });
        setListings(listings);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };

    fetchListings();
  }, []);

  if (loading) {
    return <Loader />;
  }
  return (
    <>
      <main className='category'>
        <header>
          <h1 className='pageHeader'>Offers</h1>
        </header>
        <div>
          {listings && listings.length > 0 ? (
            <div>
              <ul>
                {listings.map((item) => {
                  return <ListingItem key={item.id} listing={item} />;
                })}
              </ul>
            </div>
          ) : (
            <div>There are no offers right now !</div>
          )}
        </div>
      </main>
    </>
  );
};

export default Offers;
