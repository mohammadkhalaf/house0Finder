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
import ListingItem from '../../components/listingitem/ListingItem';
import { db } from '../../firebase';
import { toast } from 'react-toastify';
import Loader from '../../components/loader/Loader';
import classes from './category.module.css';

const Category = () => {
  const [listings, setListings] = useState(null);
  const [loading, setLoading] = useState(true);
  const [lastFetchedListing, setLastFetchedListing] = useState(null);

  const params = useParams();

  useEffect(() => {
    const fetchListings = async () => {
      setLoading(true);
      try {
        // Get reference
        const listingsRef = collection(db, 'listings');

        // Create a query
        const q = query(
          listingsRef,
          where('type', '==', params.type),
          orderBy('timestamp', 'desc'),
          limit(2),
        );

        const querySnap = await getDocs(q);

        const lastVisible = querySnap.docs[querySnap.docs.length - 1];
        setLastFetchedListing(lastVisible);

        const listings = [];

        querySnap.forEach((doc) => {
          return listings.push({
            id: doc.id,
            ...doc.data(),
          });
        });

        setListings(listings);
        setLoading(false);
      } catch (error) {
        toast.error('Could not fetch listings');
      }
    };

    fetchListings();
  }, [params.type]);

  const fetchMoreListings = async () => {
    try {
      const listingsRef = collection(db, 'listings');

      const q = query(
        listingsRef,
        where('type', '==', params.type),
        orderBy('timestamp', 'desc'),
        startAfter(lastFetchedListing),
        limit(2),
      );

      const querySnap = await getDocs(q);

      const lastVisible = querySnap.docs[querySnap.docs.length - 1];
      setLastFetchedListing(lastVisible);

      const listings = [];

      querySnap.forEach((doc) => {
        return listings.push({
          id: doc.id,
          ...doc.data(),
        });
      });

      setListings((prevState) => [...prevState, ...listings]);
      setLoading(false);
    } catch (error) {
      toast.error('Could not fetch listings');
    }
  };
  if (loading) {
    return <Loader />;
  }

  return (
    <>
      <main className={classes.category}>
        <header>
          <h1 className='pageHeader'>places for {params.type}</h1>
        </header>
        <div>
          {listings && listings.length > 0 ? (
            <div>
              <ul className={classes.categoryListings}>
                {listings.map((item) => {
                  return <ListingItem key={item.id} listing={item} />;
                })}
              </ul>
            </div>
          ) : (
            <div>No items for {params.type}</div>
          )}
        </div>
        <button onClick={fetchMoreListings}>load more</button>
      </main>
    </>
  );
};

export default Category;
