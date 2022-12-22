import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  collection,
  query,
  where,
  getDocs,
  orderBy,
  limit,
  startAfter,
} from 'firebase/firestore';
import ListingItem from '../components/ListingItem';
import { db } from '../firebase';
import { toast } from 'react-toastify';

const Category = () => {
  const [listings, setListings] = useState(null);
  const [loading, setLoading] = useState(false);
  const [lastItem,setLastItem]=useState(null)
  const params = useParams();
  useEffect(() => {
    const fetchListings = async () => {
      setLoading(true);
      try {
        const q = query(
          collection(db, 'listings'),
          where('type', '==', params.type),
          orderBy('timestamp', 'desc'),
          limit(10),
        );
        const querySnapshot = await getDocs(q);
        const lastVisible= querySnapshot.docs[querySnapshot.docs.length-1]
        setLastItem(lastVisible)


        let listings = [];
        querySnapshot.forEach((doc) => {
          return listings.push({ id: doc.id, ...doc.data() });
        });
        setListings(listings);
        setLoading(false);
      } catch (error) {
        toast.error('Could not fetch data');
      }
    };

    fetchListings();
  }, []);

  if (loading) {
    return <h5>...loading</h5>;
  }
  return (
    <>
      <h1>places for {params.type}</h1>
      <div>
        {listings && listings.length > 0 ? (
          <div>
            <ul>
              {listings.map((item) => {
                return <ListingItem key={item.id} {...item} />;
              })}
            </ul>
          </div>
        ) : (
          <div>No items</div>
        )}
      </div>
    </>
  );
};

export default Category;
