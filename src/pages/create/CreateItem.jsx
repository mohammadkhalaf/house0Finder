import { useState, useEffect } from 'react';
import { auth } from '../../firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { db } from '../../firebase';
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from 'firebase/storage';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import classes from './create.module.css';
function CreateListing() {
  // eslint-disable-next-line
  const [geolocationEnabled, setGeolocationEnabled] = useState(true);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    type: 'rent',
    name: '',
    bedrooms: 1,
    bathrooms: 1,
    parking: false,
    furnished: false,
    address: '',
    discount: false,
    regularPrice: 0,
    discountedPrice: 0,
    images: {},
    latitude: 0,
    longitude: 0,
  });

  const {
    type,
    name,
    bedrooms,
    bathrooms,
    parking,
    furnished,
    address,
    offer,
    regularPrice,
    discountedPrice,
    images,
    latitude,
    longitude,
  } = formData;

  const navigate = useNavigate();
  let isMounted = true;

  useEffect(() => {
    if (isMounted) {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          setFormData({ ...formData, userRef: user.uid });
        } else {
          navigate('/sign-in');
        }
      });
    }

    return () => {
      isMounted = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isMounted]);

  const onMutate = (e) => {
    let boolean = null;

    if (e.target.value === 'true') {
      boolean = true;
    }
    if (e.target.value === 'false') {
      boolean = false;
    }

    // Files
    if (e.target.files) {
      setFormData((prevState) => ({
        ...prevState,
        images: e.target.files,
      }));
    }

    // Text/Booleans/Numbers
    if (!e.target.files) {
      setFormData((prevState) => ({
        ...prevState,
        [e.target.id]: boolean ?? e.target.value,
      }));
    }
  };
  const submitHanlder = async (e) => {
    console.log(discountedPrice);
    console.log(regularPrice);
    e.preventDefault();
    if (+discountedPrice > +regularPrice) {
      toast.error('Discounted price needs to be less than regular price');
      return;
    }
    if (images.length > 6) {
      toast.error('Max 6 images');
      return;
    }
    let geolocation = {};
    let location;
    if (geolocationEnabled) {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${process.env.REACT_APP_GEOCODE_API_KEY}`,
      );
      const data = await response.json();
      geolocation.lat = data?.results[0]?.geometry.location.lat ?? 0;
      geolocation.long = data?.results[0]?.geometry.location.lng ?? 0;
      location =
        data.status === 'ZERO_RESULTS'
          ? undefined
          : data.results[0]?.formatted_address;
      if (location === undefined || location.includes('undefined')) {
        toast.error('Pleas enter correct address');
        return;
      }
    } else {
      geolocation.lat = latitude;
      geolocation.long = longitude;
      location = address;
    }
    const storeImage = async (image) => {
      return new Promise((resolve, reject) => {
        const storage = getStorage();
        const fileName = `${auth.currentUser.uid}-${
          image.name
        }-${Math.random()}`;
        const storageRef = ref(storage, 'images/' + fileName);
        const uploadTask = uploadBytesResumable(storageRef, image);
        uploadTask.on(
          'state_changed',
          (snapshot) => {
            const progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log('Upload is ' + progress + '% done');
          },
          (error) => {
            reject(error);
            console.log(error);
          },
          () => {
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
              resolve(downloadURL);
              console.log(downloadURL);
            });
          },
        );
      });
    };
    const imgUrls = await Promise.all(
      [...images].map((image) => storeImage(image)),
    ).catch(() => {
      toast.error('images not uploaded');
      return;
    });
    const copyData = {
      ...formData,
      imgUrls,
      geolocation,
      timestamp: serverTimestamp(),
    };
    delete copyData.images;
    const docRef = await addDoc(collection(db, 'listings'), copyData);
    toast.success('added!');
    navigate(`/category/${copyData.type}/${docRef.id}`);
  };

  return (
    <div className='profile'>
      <header>
        <p className='pageHeader'>Create a Listing</p>
      </header>

      <main>
        <form onSubmit={submitHanlder}>
          <label className={classes.formLabel}>Sell / Rent</label>
          <div className={classes.formButtons}>
            <button
              type='button'
              className={
                type === 'sale'
                  ? `${classes.formButtonActive}`
                  : `${classes.formButton}`
              }
              id='type'
              value='sale'
              onClick={onMutate}
            >
              Sell
            </button>
            <button
              type='button'
              className={
                type === 'rent'
                  ? `${classes.formButtonActive}`
                  : `${classes.formButton}`
              }
              id='type'
              value='rent'
              onClick={onMutate}
            >
              Rent
            </button>
          </div>

          <label className={classes.formLabel}>Name</label>
          <input
            className={classes.formInputName}
            type='text'
            id='name'
            value={name}
            onChange={onMutate}
            maxLength='32'
            minLength='10'
            required
          />

          <div className={classes.flex}>
            <div>
              <label className={classes.formLabel}>Bedrooms</label>
              <input
                className={classes.formInputSmall}
                type='number'
                id='bedrooms'
                value={bedrooms}
                onChange={onMutate}
                min='1'
                max='50'
                required
              />
            </div>
            <div>
              <label className={classes.formLabel}>Bathrooms</label>
              <input
                className={classes.formInputSmall}
                type='number'
                id='bathrooms'
                value={bathrooms}
                onChange={onMutate}
                min='1'
                max='50'
                required
              />
            </div>
          </div>

          <label className={classes.formLabel}>Parking spot</label>
          <div className={classes.formButtons}>
            <button
              className={
                parking
                  ? `${classes.formButtonActive}`
                  : `${classes.formButton}`
              }
              type='button'
              id='parking'
              value={true}
              onClick={onMutate}
              min='1'
              max='50'
            >
              Yes
            </button>
            <button
              className={
                !parking && parking !== null
                  ? `${classes.formButtonActive}`
                  : `${classes.formButton}`
              }
              type='button'
              id='parking'
              value={false}
              onClick={onMutate}
            >
              No
            </button>
          </div>

          <label className={classes.formLabel}>Furnished</label>
          <div className={classes.formButtons}>
            <button
              className={
                furnished
                  ? `${classes.formButtonActive}`
                  : `${classes.formButton}`
              }
              type='button'
              id='furnished'
              value={true}
              onClick={onMutate}
            >
              Yes
            </button>
            <button
              className={
                !furnished && furnished !== null
                  ? `${classes.formButtonActive}`
                  : `${classes.formButton}`
              }
              type='button'
              id='furnished'
              value={false}
              onClick={onMutate}
            >
              No
            </button>
          </div>

          <label className={classes.formLabel}>Address</label>
          <textarea
            className='formInputAddress'
            type='text'
            id='address'
            value={address}
            onChange={onMutate}
            required
          />

          {!geolocationEnabled && (
            <div className={classes.flex}>
              <div>
                <label className={classes.formLabel}>Latitude</label>
                <input
                  className={classes.formInputSmall}
                  type='number'
                  id='latitude'
                  value={latitude}
                  onChange={onMutate}
                  required
                />
              </div>
              <div>
                <label className={classes.formInputSmall}>Longitude</label>
                <input
                  className={classes.formInputSmall}
                  type='number'
                  id='longitude'
                  value={longitude}
                  onChange={onMutate}
                  required
                />
              </div>
            </div>
          )}

          <label className={classes.formLabel}>Offer</label>
          <div className={classes.formButtons}>
            <button
              className={
                offer ? `${classes.formButtonActive}` : `${classes.formButton}`
              }
              type='button'
              id='offer'
              value={true}
              onClick={onMutate}
            >
              Yes
            </button>
            <button
              className={
                !offer && offer !== null
                  ? `${classes.formButtonActive}`
                  : `${classes.formButton}`
              }
              type='button'
              id='offer'
              value={false}
              onClick={onMutate}
            >
              No
            </button>
          </div>

          <label className={classes.formLabel}>Regular Price</label>
          <div className={classes.formPriceDiv}>
            <input
              className={classes.formInputSmall}
              type='number'
              id='regularPrice'
              value={regularPrice}
              onChange={onMutate}
              min='50'
              max='750000000'
              required
            />
            {type === 'rent' && <p className='formPriceText'>$ / Month</p>}
          </div>

          {offer && (
            <>
              <label className={classes.formLabel}>Discounted Price</label>
              <input
                className={classes.formInputSmall}
                type='number'
                id='discountedPrice'
                value={discountedPrice}
                onChange={onMutate}
                min='50'
                max='750000000'
                required={offer}
              />
            </>
          )}

          <label className={classes.formLabel}>Images</label>
          <p className={classes.imagesInfo}>
            The first image will be the cover (max 6).
          </p>
          <input
            className={classes.formInputFile}
            type='file'
            id='images'
            onChange={onMutate}
            max='6'
            accept='.jpg,.png,.jpeg'
            multiple
            required
          />
          <button
            type='submit'
            className={`${classes.createListingButton} ${classes.primaryButton}`}
          >
            Create Listing
          </button>
        </form>
      </main>
    </div>
  );
}

export default CreateListing;
