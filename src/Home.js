import React, { useEffect, useState } from 'react';
import ThreeDCardDemo from './components/AccernityComponent/Card';
import ShuffleHero from './components/Frammer/Hero';
import { SwipeCarousel } from './components/Frammer/Carusal';
import Testimonial from './components/Frammer/Testimonial';
import Auth from './components/Auth';
import { VideoGallery } from './components/Frammer/VideoGallery';
import Navbar from './components/AccernityComponent/Navbar';
import Footer from './components/AccernityComponent/Footer';
import app from './Firebase';
import { get } from 'firebase/database';
import { getDatabase ,ref} from 'firebase/database';





export default function Home() {
  const [products, setProducts] = useState([]);
  
  useEffect(() => {
    const userRef = ref(getDatabase(), `products/`);
    get(userRef)
      .then((snapshot) => {
        const profileData = snapshot.val();
        if (profileData) {
          setProducts(Object.values(profileData));
         
        }
      })
      .catch((error) => {
        console.error('Error fetching user profile data:', error.message);
      });
  }, []);
  
  const CardGrid = () => {
   
    const truncateDescription = (description) => {
      const words = description.split(' ');
      if (words.length > 13) {
        return words.slice(0, 13).join(' ') + '...';
      }
      return description;
    };
    const truncatetitle = (description) => {
      const words = description.split(' ');
      if (words.length > 6) {
        return words.slice(0, 6).join(' ') + '...';
      }
      return description;
    };
    return (
      <div className=" grid grid-rows-2 grid-cols-3  space-x-5">
  {/* Map through the array and render a ThreeDCardDemo component inside each div */}
  {products?.slice(0,6).map((card, index) => (
            <div key={index} className="card">
              {/* Pass appropriate props to ThreeDCardDemo */}
              <ThreeDCardDemo
                heading={truncatetitle(card.title)} 
                des={truncateDescription(card.description)} 
                src={card.images[0]}
                id={card.productId
}
              />
            </div>
          ))}
      </div>
    );
  };
  return (
    <><Navbar/>
    <div className='bg-[#FFF8E7] w-full flex flex-col'>
      < ShuffleHero/>
      <h1 className='text-8xl font-bold text-center text-[#FED766] mt-16'>Explore Art History</h1>
      <p className="mt-5 text-4xl text-gray-600 text-center w-full px-32  flex justify-center items-center">
      Delve into the rich tapestry of art history and unravel the stories behind our cultural heritage.
      </p>
      <div className='w-full px-32 flex justify-center items-center '><VideoGallery/></div>
      <h1 className='text-8xl font-bold text-center text-[#FED766] mt-16'>Our Specialities</h1>
      <p className="mt-5 text-4xl text-gray-600 text-center w-full px-32  flex justify-center items-center">
        Discover our exquisite Chikankari creations and explore the opulent world of our specialities.
      </p>
      <div className='w-full px-32'><CardGrid/></div>

      <div className='overflow-hidden w-full my-16'>
     <Auth/>
      </div>
      <h1 className='text-8xl font-bold text-center text-[#FED766] mt-16'>Art Gallery</h1>
      <p className="mt-5 text-4xl text-gray-600 text-center w-full px-32  flex justify-center items-center">
        Immerse yourself in the beauty of Chikankari artistry and experience the charm of our Art Gallery.
      </p>
      <div className='overflow-hidden w-full my-16'>
        <SwipeCarousel/>
      </div>
      <Testimonial/>
    </div>
    <Footer/>
    </>
  );
}
