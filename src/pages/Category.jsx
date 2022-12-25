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
  // const [listings, setListings] = useState(null);
  // const [loading, setLoading] = useState(false);
  // const [lastItem,setLastItem]=useState(null)
  // const params = useParams();
  // useEffect(() => {
  //   const fetchListings = async () => {
  //     setLoading(true);
  //     try {
  //       const q = query(
  //         collection(db, 'listings'),
  //         where('type', '==', params.type),
  //         orderBy('timestamp', 'desc'),
  //         limit(2),
  //       );
  //       const querySnapshot = await getDocs(q);
  //       const lastVisible = querySnapshot.docs[querySnapshot.docs.length - 1];
  //       setLastItem(lastVisible);
  //       console.log(lastVisible);

  //       console.log('sf');

  //       let listings = [];
  //       querySnapshot.forEach((doc) => {
  //         return listings.push({ id: doc.id, ...doc.data() });
  //       });
  //       setListings(listings);
  //         console.log(listings.length);
  //       setLoading(false);
  //     } catch (error) {
  //       toast.error('Could not fetch data');
  //     }
  //   };

  //   fetchListings();
  
  // }, [params.type]);

  //    const fetchMoreListings = async () => {
  //      setLoading(true);
  //      try {
  //        const q = query(
  //          collection(db, 'listings'),
  //          where('type', '==', params.type),
  //          orderBy('timestamp', 'desc'),
  //          startAfter(lastItem),
  //          limit(2),
  //        );
  //        const querySnapshot = await getDocs(q);
  //        const lastVisible = querySnapshot.docs[querySnapshot.docs.length - 1];
  //        setLastItem(lastVisible);
  //        console.log(lastVisible);

  //        console.log('sf');

  //        let listings = [];
  //        querySnapshot.forEach((doc) => {
  //          return listings.push({ id: doc.id, ...doc.data() });
  //        });
  //        setListings((prev)=>[...prev,...listings]);
  //        setLoading(false);
       
  //      } catch (error) {
  //        toast.error('Could not fetch data');
  //      }
  //    };
  // if (loading) {
  //   return <h5>...loading</h5>;
  // }
   const [listings, setListings] = useState(null);
   const [loading, setLoading] = useState(true);
   const [lastFetchedListing, setLastFetchedListing] = useState(null);

   const params = useParams();

   useEffect(() => {
     const fetchListings = async () => {
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

         // Execute query
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

  return (
    <>
      <h1>places for {params.type}</h1>
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
          <div>No items</div>
        )}
      </div>
      <button onClick={fetchMoreListings}>load more</button>
    </>
  );
};

export default Category;
