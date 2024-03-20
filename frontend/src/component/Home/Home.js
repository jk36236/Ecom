import React, { Fragment } from 'react'
import {CgMouse} from 'react-icons/cg';
import './Home.css';
import Product from './Product';

//temp product object
const product={
  name:"Tshirt",
  images:[{url:"https://i.ibb.co/DRST11n/1.webp"}],
  price:"3000",
  _id:"jatin",
}

const Home = () => {

  return (
    <Fragment>
      {/*------------- banner---------- */}
      <div className="banner">
        <p>Welcome to Ecommerce</p>
        <h1>FIND AMAZING PRODUCTS BELOW</h1>

        <a href="#container">
          <button>
            Scroll <CgMouse />
          </button>
        </a>
      </div>
{/* ------------Featured Products------------------- */}
      <h2 className='homeHeading'>Featured Products</h2>

    <div className='container' id='container'>
      <Product product={product} />
      {/* jab redux implement karenge vhan se fetch krke denge product ko ,for now lets create a temporary object product */}
      <Product product={product} />
      <Product product={product} />
      <Product product={product} />

      <Product product={product} />
      <Product product={product} />
      <Product product={product} />
      <Product product={product} />
    </div>

    </Fragment>
  );
}

export default Home