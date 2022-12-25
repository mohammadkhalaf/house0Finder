import { Link } from 'react-router-dom';
import sellImage from '../../assets/sell.jpeg';
import rentImage from '../../assets/rent.jpeg';
const Explore = () => {
  return (
    <main>
      <header>
        <h2>Explore</h2>
      </header>
      <section>
        <h4>Categories</h4>
        <div>
          <Link to='/category/rent'>
            <img src={rentImage} alt='rent' />
            <p>For rent </p>
          </Link>
          <Link to='/category/sell'>
            <img src={sellImage} alt='sell' />
            <p>For sell</p>
          </Link>
        </div>
      </section>
    </main>
  );
};

export default Explore;
