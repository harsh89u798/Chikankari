import React, { useContext } from 'react'
import { useEffect, useState } from 'react';
import { getDatabase, ref, get, set } from 'firebase/database';
import { useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from "framer-motion";
import {toast} from 'react-toastify'
import User from './Global';
import {useNavigate} from 'react-router-dom'
import { SwipeCarousel } from './Frammer/Carusal';
import Loader from './AccernityComponent/Loader';
export default function ItemView() {
  const navigate=  useNavigate();
  const[loader,setLoader]= useState(true);
  const [user, setUser] = useContext(User)
  const [cart,setCart]= useState(true)
  const [hire,setHire]= useState(true)
  const [product, setProduct] = useState(null);
  const location = useLocation();
  const productId = location.pathname.split('/')[2];
  const name = location.pathname.split('/')[2].split('&')[0];
  const sellerID = location.pathname.split('/')[2].split('&')[1];
  const[open,setOpen]=useState(false);
  useEffect(() => {
    if (!user) return; // Handle initial null value of user context
    
    const fetchProduct = async () => {
      try {
        const productRef = ref(getDatabase(), `products/${productId}`);
        const snapshot = await get(productRef);
        const profileData = snapshot.val();
        if (profileData) {
          setProduct(profileData);
        }
      } catch (error) {
        console.error('Error fetching product:', error);
      }
    };

    const fetchCartInfo = async () => {
      const userID = user.id;
      const sellerId = sellerID;
      const productID = productId;
      
      try {
        const userRef = ref(getDatabase(), `users/${userID}/cart/pending/${productID}`);
        const userRef1 = ref(getDatabase(), `users/${userID}/cart/hired/${productID}`);
        const snapshot = await get(userRef);
        const snapshot1 = await get(userRef1);
        const userData = snapshot.val();
        const userData1 = snapshot1.val();
        if (userData && userData.productID === productID) {
          setCart(false); // If product is in cart, set cart state to true
        } else {
          setCart(true);
        }
        if (userData1 && userData1.productID === productID) {
          setHire(false); // If product is in cart, set cart state to true
        } else {
          setHire(true);
        }
      } catch (error) {
        console.error('Error fetching cart information:', error);
      }
    };
const fetchdata= async()=>{
await  fetchProduct();
await fetchCartInfo();
setLoader(!loader)

}
   
  
fetchdata();
  }, [user, productId, sellerID]);

  const AddCart = async () => {

    if(!user.login){
toast.error("Please Login to proceed!")
return
    }
    const userID = user.id;
    const sellerId= sellerID;
    const productID = productId;
    try {

      const userRef = ref(getDatabase(), `users/${userID}/cart/pending/${productID}`);
      const sellerRef = ref(getDatabase(), `users/${sellerId}/impressions/pending/${userID}`);
      await set(userRef, { productID });
      await set(sellerRef, { userID,productID });
     
      toast.success("Design Added in Cart!")
      setCart(false)

    } catch (error) {
      console.error('Error saving user data:', error.message);
    }
  }
  const ViewCart =()=>{
   navigate('/dashboard/Cart');
  }
  const HireNow=()=>{
    setOpen(true)
  }
  return (
    <>  { loader && <Loader/>}
    <div className='bg-[#FFF8E7] w-full h-screen p-20'>
     
<div className="relative z-10 w-full h-full gap-5 items-center p-8 bg-white rounded-3xl lg:flex-col">

        <div className=' flex w-full h-full space-x-10'>
          <div className=" py-5 sm:mx-auto sm:text-center w-1/2 lg:text-left">
            <a class="flex items-center gap-2 bg-white p-3 hover:bg-gray-50 rounded-3xl w-1/2">
              <img
                alt=""
                src="https://images.unsplash.com/photo-1600486913747-55e5470d6f40?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
                class="size-10 rounded-full object-cover"
              />

              <div>
                <p class="text-xs">
                  <strong class="block font-medium text-2xl text-[#FED766]">{name}</strong>

                  <span className='text-[#B08B59] text-md font-semibold'>{product?.experience}</span>
                </p>
              </div>
            </a>

            <h3 className="text-3xl text-[#FED766] font-semibold">
              {product?.title}
            </h3>
            <p className="text-base md:text-lg text-slate-700 my-4 md:my-6">
              {product?.description}
            </p>
            <div className=' flex space-x-5'>
              {
                hire?(<>
                 <a onClick={HireNow}
                className="mt-5 px-6 py-3 text-white font-medium cursor-pointer bg-[#B08B59] rounded inline-flex items-center"
              >
                Hire Now

              </a>
                </>):(<></>)
              }
             
              
              {cart ? (<>
                <a onClick={AddCart}
                className="mt-5 px-6 py-3  cursor-pointer font-medium border-[#B08B59] bg-transparent border-2 hover:bg-[#B08B59] hover:text-white text-[#B08B59] rounded inline-flex items-center"
              >
                Add Cart

              </a>
              </>):(<><a onClick={ViewCart}
                className="mt-5 px-6 py-3  cursor-pointer font-medium border-[#B08B59] bg-transparent border-2 hover:bg-[#B08B59] hover:text-white text-[#B08B59] rounded inline-flex items-center"
              >
                View Cart

              </a></>)}</div>
          </div>
          <ProductImages product={product} />
        </div>
        <SpringModal open={open} setOpen={setOpen} user={user} productId={productId} sellerID={sellerID} setHire={setHire}/>
      </div>


    </div></>
  )
}
function ProductImages({ product }) {
  const numImages = product?.images?.length;
  let gridCols = 'grid-cols-2';
  let gridRows = 'grid-rows-2';

  if (numImages === 1 || numImages === 2) {
    gridCols = 'grid-cols-2';
    gridRows = 'grid-rows-1';
  } else if (numImages === 3) {
    gridCols = 'grid-cols-3';
    gridRows = 'grid-rows-1';
  } else if (numImages === 4) {
    gridCols = 'grid-cols-2';
    gridRows = 'grid-rows-2';
  }

  return (
    <div className={`mt-5 w-1/2 grid gap-5 h-3/4 ${gridCols} ${gridRows}`}>
      {product?.images?.map((image, index) => (
        <img
          key={index}
          src={image}
          alt=""
          className="w-full h-full object-cover rounded-2xl"
        />
      ))}
    </div>
  );
}

const SpringModal = ({ open, setOpen ,user,productId,sellerID,setHire}) => {
 
  const[name,setName]= useState('')
  const[email,setEmail]= useState('')
  const[phone,setPhone]= useState(0)
  const Submit= async()=>{
    if(!user.login){
      toast.error("Please Login to proceed!")
      return
          }
          const userID = user.id;
          const sellerId= sellerID;
          const productID = productId;
          try {
      
            const userRef = ref(getDatabase(), `users/${userID}/cart/hired/${productID}`);
            const sellerRef = ref(getDatabase(), `users/${sellerId}/impressions/hired/${userID}`);
            await set(userRef, { productID });
            await set(sellerRef, { userID,productID ,name,email,phone});
           
            toast.success("Hired successfully!")
            setOpen(!open)
            setHire(false)
      
          } catch (error) {
            console.error('Error saving user data:', error.message);
          }
  }
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setOpen(false)}
          className="bg-slate-900/20 backdrop-blur p-8 fixed inset-0 z-50 grid place-items-center overflow-y-scroll cursor-pointer"
        >
          <motion.div
            initial={{ scale: 0, rotate: "12.5deg" }}
            animate={{ scale: 1, rotate: "0deg" }}
            exit={{ scale: 0, rotate: "0deg" }}
            onClick={(e) => e.stopPropagation()}
            className="bg-[#B08B59]  text-white p-6 rounded-lg w-full max-w-lg shadow-xl cursor-default relative overflow-hidden"
          >
           
            <div className="relative z-10">
            <button className='font-bold text-2xl text-white text-center font-serif'>ChikanCraft</button>

          <input onChange={(e)=>setName(e.target.value)} type='text' className=' rounded border-white border-2 px-3 py-1.5 w-full placeholder:text-white outline-none text-white bg-transparent my-3' placeholder='Enter name'/>
          <input onChange={(e)=>setPhone(e.target.value)} type='number' className=' rounded border-white border-2 px-3 py-1.5 w-full placeholder:text-white outline-none text-white bg-transparent my-3' placeholder='+91 **********'/>
          <input onChange={(e)=>setEmail(e.target.value)} type='text' className=' rounded border-white border-2 px-3 py-1.5 w-full placeholder:text-white outline-none text-white bg-transparent my-3' placeholder='Email'/>
              <div className="flex gap-2">
                <button
                  onClick={() => setOpen(false)}
                  className="bg-transparent hover:bg-white/10 transition-colors text-white font-semibold w-full py-2 rounded"
                >
                  Cancel
                </button>
                <button
                  onClick={Submit}
                  className="bg-white hover:opacity-90 transition-opacity text-[#B08B59] font-semibold w-full py-2 rounded"
                >
                 Submit
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
