import React, { useContext, useState } from 'react';
import { HoveredLink, Menu, MenuItem, ProductItem } from './Navbar_'; 
import { Link } from 'react-scroll';
import { Link as Link1 ,useNavigate} from 'react-router-dom';
import User from '../Global';
import {toast} from 'react-toastify'


function Navbar() {
  const navigate= useNavigate();
    const [active, setActive] = useState(null);
    const[user,setUser]=useContext(User);
   const openCart=()=>{
if(!user.login){
  toast.error("Please Login!")
  return
}
navigate('/dashboard/Cart')
   }
    return (
      <div className={`fixed top-5 inset-x-0 flex justify-center w-full p-0 z-[999]`}>
        <div className='justify-between w-9/12 z-[100000] rounded-full border border-transparent dark:bg-black dark:border-white/[0.2] bg-white shadow-input flex space-x-4 px-8 py-3 items-center'>
        <button className='font-bold text-2xl text-[#B08B59] font-serif'>ChikanCraft</button>

          <Menu setActive={setActive}>
            
            <MenuItem setActive={setActive} active={active} item="Services">
              <div className="flex flex-col space-y-4 text-sm">
                <HoveredLink to="/design">Design Services</HoveredLink>
                <HoveredLink to="/custom">Custom Creations</HoveredLink>
                <HoveredLink to="/consultation">Consultation</HoveredLink>
              </div>
            </MenuItem>
            <MenuItem setActive={setActive} active={active} item="Products">
              <div className="text-sm grid grid-cols-2 gap-10 p-4 ">
                <ProductItem
                  title="ChikanSarees"
                  href="/sarees"
                  src="https://theindiancouture.com/cdn/shop/articles/fyrjdrtdr_chikankari_embroidery_a2154a27-907a-407b-84aa-2ad25d567f86.png?v=1675872939"
                  description="Elegant Chikankari sarees for every occasion."
                />
                <ProductItem
                  title="ChikanKurtis"
                  href="/kurtis"
                  src="https://designmango.in/upload/blog_images/History-Of-Chikankari-designmango-1686993414_History%20of%20Chikhan-designamngo.in.png"
                  description="Stylish and comfortable Chikankari kurtis."
                />
                <ProductItem
                  title="ChikanLehengas"
                  href="/lehengas"
                  src="https://www.unnatisilks.com/cdn/shop/articles/main-image-11.jpg?v=1655293910&width=2048"
                  description="Traditional Chikankari lehengas for weddings."
                />
                <ProductItem
                  title="ChikanAccessories"
                  href="/accessories"
                  src="https://sahibahandicrafts.com/wp-content/uploads/2021/09/WhatsApp-Image-2021-09-05-at-7.55.57-PM.jpeg"
                  description="Accessorize your attire with our Chikankari accessories."
                />
              </div>
            </MenuItem>

            <MenuItem setActive={setActive} active={active} item="About">
              <div className="flex flex-col space-y-4 text-sm">
                <HoveredLink to="/history">Our History</HoveredLink>
                <HoveredLink to="/team">Our Team</HoveredLink>
                <HoveredLink to="/contact">Contact Us</HoveredLink>
              </div>
            </MenuItem>
       
                <button onClick={openCart}>Cart</button>
                
          
          </Menu>
          {
            user.login?(<><Link1 to={"/dashboard/upload"} smooth={true} duration={2000}> <button className='rounded-full px-6 py-2 bg-[#B08B59] text-md font-medium hover:bg-[#876941] text-white'>Dashboard</button></Link1></>) : (<><Link to={"auth"} smooth={true} duration={2000}> <button className='rounded-full px-6 py-2 bg-[#B08B59] text-md font-medium hover:bg-[#876941] text-white'>Login</button></Link></>)
          }
        
        </div>
      </div>
    );
  }

export default Navbar;
