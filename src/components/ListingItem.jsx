import React from 'react';
import { Link } from 'react-router-dom';
import { FaBed, FaBath } from 'react-icons/fa';

const ListingItem = (listing) => {
  return (
    <>
      <li>
        <Link to={`category/${listing.type}/${listing.id}`}>
          <img src={listing.imgUrls[0]} alt={listing.name} />
          <div>
            <p>{listing.location}</p>
            <p>
              {listing.discount
                ? listing.discountedPrice
                : listing.regularPrice}
              $ {listing.type === 'rent' && '/ month'}
            </p>
            <div>
              <span>
                <FaBed />
                {listing.bedrooms > 1 ? 'bedrooms' : 'bedroom'}
              </span>
              <span>
                <FaBath />
                {listing.bathrooms > 1 ? 'bathrooms' : 'bathroom'}
              </span>
            </div>
          </div>
        </Link>
      </li>
    </>
  );
};

export default ListingItem;
