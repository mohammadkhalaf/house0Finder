import { Link } from 'react-router-dom';
import sellImage from '../../assets/sell.jpeg';
import rentImage from '../../assets/rent.jpeg';
import classes from './explore.module.css';
const Explore = () => {
  return (
    <main className='explore'>
      <header>
        <h2 className='pageHeader'>Explore</h2>
      </header>
      <section>
        <h4 className={classes.exploreCategoryHeading}>Categories</h4>
        <div className={classes.exploreCategories}>
          <Link to='/category/rent'>
            <img
              src={rentImage}
              alt='rent'
              className={classes.exploreCategoryImg}
            />
            <p className={classes.exploreCategoryName}>For rent </p>
          </Link>
          <Link to='/category/sale'>
            <img
              src={sellImage}
              alt='sell'
              className={classes.exploreCategoryImg}
            />
            <p className={classes.exploreCategoryName}>For sell</p>
          </Link>
        </div>
      </section>
    </main>
  );
};

export default Explore;
