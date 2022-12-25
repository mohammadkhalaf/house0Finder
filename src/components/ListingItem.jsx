import React from 'react';
import { Link } from 'react-router-dom';
import { FaBed, FaBath } from 'react-icons/fa';

const ListingItem = ( {listing,  onDelete }) => {

  return (
    <>
      <li style={{width:'300px', height:'300px'}}>
        <Link to={`/category/${listing.type}/${listing.id}`}>
          <img src={listing.imgUrls[0]} alt={listing.name} style={{height:'100%', width:'100%', objectFit:'cover'}} />
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
        <button onClick={() => onDelete(listing.id)}>
          {listing.id}
        </button>
      </li>
    </>
  );
};

export default ListingItem;
