import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { getDoc, doc } from 'firebase/firestore';
import { db, auth } from '../firebase';

const ListingItem = () => {
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [err, setError] = useState(null);
  const navigate = useNavigate();
  const params = useParams();
  useEffect(() => {
    const fetchItem = async () => {
      setLoading(true);
      const docRef = doc(db, 'listings', params.id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        console.log('Document data:', docSnap.data());
        setListing(docSnap.data());
        setLoading(false);
      } else {
        setError('Wrong');
      }
    };
    fetchItem();
  }, [params.id]);

  if (loading) {
    return <h1>loading...</h1>;
  }
  return (
    <>
      {listing && (
        <main>
          <button
            onClick={() => {
              navigator.clipboard.writeText(window.location.href);
              setCopiedLink(true);
              setTimeout(() => {
                setCopiedLink(false);
              }, 2000);
            }}
          >
            Copy the link
          </button>
          {copiedLink && <p>Link copied</p>}

          <div>
            <p>{listing.name}</p>
            <p>
              {listing.discount
                ? listing.discountedPrice
                : listing.regularPrice}
            </p>
            <p>{listing.address}</p>
            <p>for {listing.type}</p>
            {listing.discount && (
              <p>You save {listing.regularPrice - listing.discountedPrice}</p>
            )}
            <p>{listing.bedrooms} bedrooms</p>
            <p>
              {listing.bathrooms}{' '}
              {listing.bathrooms > 1 ? 'bathrooms' : 'bathroom'}
            </p>
            <p>{listing.furnished && 'furnished'}</p>
            {auth.currentUser?.uid !== listing.userRef && (
              <Link
                to={`/contact/${listing.userRef}?listingName=${listing.name}`}
              >
                Contact
              </Link>
            )}
          </div>
        </main>
      )}
    </>
  );
};

export default ListingItem;
