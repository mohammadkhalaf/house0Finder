import React from 'react';
import { Link } from 'react-router-dom';
import { FaBed, FaBath } from 'react-icons/fa';
import { AiFillDelete } from 'react-icons/ai';
import classes from './listing.module.css';

const ListingItem = ({ listing, onDelete }) => {
  return (
    <>
      <li className={classes.categoryListing}>
        <Link
          to={`/category/${listing.type}/${listing.id}`}
          className={classes.categoryListingLink}
        >
          <img
            src={listing.imgUrls[0]}
            alt={listing.name}
            className={classes.categoryListingImg}
          />
          <div className={classes.categoryListingDetails}>
            <p className={classes.categoryListingLocation}>{listing.address}</p>
            <p className={classes.categoryListingName}>{listing.name}</p>
            <p className={classes.categoryListingPrice}>
              {listing.discount
                ? listing.discountedPrice
                : listing.regularPrice}
              $ {listing.type === 'rent' && '/ month'}
            </p>
            <div className={classes.categoryListingInfoDiv}>
              <span className={classes.iconDiv}>
                <FaBed className={classes.icon} />
                {listing.bedrooms > 1 ? 'bedrooms' : 'bedroom'}
              </span>
              <span>
                <FaBath className={classes.icon} />
                {listing.bathrooms > 1 ? 'bathrooms' : 'bathroom'}
              </span>
            </div>
          </div>
        </Link>
        {onDelete && (
          <AiFillDelete
            className={classes.removeIcon}
            fill='rgb(231,76,60)'
            onClick={() => onDelete(listing.id)}
          />
        )}
      </li>
    </>
  );
};

export default ListingItem;
