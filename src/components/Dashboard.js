import React, { useContext, useEffect, useState } from 'react'
import User from './Global'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { useDropzone } from 'react-dropzone';
import { toast } from 'react-toastify';
import { storage, database } from '../Firebase';
import { ref, push, getDownloadURL, uploadBytesResumable, uploadBytes } from 'firebase/storage';
import { ref as dbRef, push as dbPush, set, get, getDatabase } from 'firebase/database';
import { auth } from '../Firebase';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import ThreeDCardDemo from './AccernityComponent/Card';
import Loader from './AccernityComponent/Loader';

export default function Dashboard() {
  const location = useLocation();
  const [user, setUser] = useContext(User);
  const [page, setPage] = useState('upload');


  useEffect(() => {

    const pageName = location.pathname.split('/')[2];
    setPage(pageName)
  }, [location])

  const navigate = useNavigate();
  const logout = async () => {
    try {
      await auth.signOut();
      // Optionally, you can perform any additional tasks after the user is successfully logged out
      toast.success('User logged out successfully');
      navigate('/');
    } catch (error) {
      toast.error('Error logging out:', error);
      // Optionally, handle any errors that occur during logout
    }
  };
  return (
    <div className=' w-full h-screen flex bg-[#FFF8E7]'>
      <div class="flex h-full flex-col justify-between border-e w-1/5 bg-white">
        <div class="px-4 py-6">
          <Link to={"/"}><button className='font-bold text-3xl text-[#B08B59] text-center font-serif'>ChikanCraft</button></Link>

          <ul class="mt-6 space-y-1">
            <li>
              <Link to={'/dashboard/upload'}
                class={`block rounded-lg cursor-pointer ${page === 'upload' ? 'bg-[#B08B59] text-white' : 'bg-white text-gray-700'} px-4 py-2 hover:bg-[#B08B59] hover:text-white text-sm font-medium  `}
              >
                Upload Designs
              </Link>
            </li>

            <li>
              <details class="group [&_summary::-webkit-details-marker]:hidden">
                <summary
                  class="flex cursor-pointer items-center justify-between rounded-lg px-4 py-2 text-gray-500 hover:bg-[#B08B59] hover:text-white"
                >
                  <span class="text-sm font-medium"> Impressions </span>

                  <span class="shrink-0 transition duration-300 group-open:-rotate-180">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-5 w-5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                        clip-rule="evenodd"
                      />
                    </svg>
                  </span>
                </summary>

                <ul class="mt-2 space-y-1 px-4">
                  <li>
                    <Link to={'/dashboard/Hired'}
                      class={`block rounded-lg ${page === "Hired" ? "bg-[#B08B59] text-white" : " bg-white text-gray-500"} px-4 py-2 text-sm font-medium cursor-pointer  hover:bg-[#B08B59] hover:text-white`}
                    >
                      Hired
                    </Link>
                  </li>

                  <li>
                    <Link to={'/dashboard/Pending'}
                      class={`block rounded-lg ${page === "Pending" ? "bg-[#B08B59] text-white" : " bg-white text-gray-500"} px-4 py-2 text-sm font-medium cursor-pointer  hover:bg-[#B08B59] hover:text-white`}
                    >
                      Pending
                    </Link>
                  </li>
                  <li>
                    <Link to={'/dashboard/Rejected'}
                      onClick={() => setPage('Rejected')}
                      class={`block rounded-lg ${page === "Rejected" ? "bg-[#B08B59] text-white" : " bg-white text-gray-500"} px-4 py-2 text-sm font-medium cursor-pointer  hover:bg-[#B08B59] hover:text-white`}
                    >
                      Rejected
                    </Link>
                  </li>
                </ul>
              </details>
            </li>

            <li>
              <Link to={'/dashboard/Cart'}
                class={`block rounded-lg cursor-pointer ${page === 'Cart' ? 'bg-[#B08B59] text-white' : 'bg-white text-gray-700'} px-4 py-2 hover:bg-[#B08B59] hover:text-white text-sm font-medium  `}
              >
                Cart
              </Link>
            </li>



            <li>
              <details class="group [&_summary::-webkit-details-marker]:hidden">
                <summary
                  class="flex cursor-pointer items-center justify-between rounded-lg px-4 py-2 text-gray-500 hover:bg-[#B08B59] hover:text-white"
                >
                  <span class="text-sm font-medium"> Account </span>

                  <span class="shrink-0 transition duration-300 group-open:-rotate-180">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-5 w-5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                        clip-rule="evenodd"
                      />
                    </svg>
                  </span>
                </summary>

                <ul class="mt-2 space-y-1 px-4">
                  <li>
                    <Link to={'/dashboard/details'}
                      class="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-[#B08B59] hover:text-white"
                    >
                      Details
                    </Link>
                  </li>

                  <li>
                    <Link to={'/dashboard/Security'}
                      class="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-[#B08B59] hover:text-white"
                    >
                      Security
                    </Link>
                  </li>

                  <li>

                    <button
                      onClick={logout}
                      type="submit"
                      class="w-full rounded-lg px-4 py-2 text-sm font-medium text-gray-500 [text-align:_inherit] hover:bg-[#B08B59] hover:text-white"
                    >
                      Logout
                    </button>

                  </li>
                </ul>
              </details>
            </li>
          </ul>
        </div>

        <div class="sticky inset-x-0 bottom-0 border-t-2 border-gray-200">
          <a class="flex items-center gap-2 bg-white p-4 hover:bg-gray-50">
            <img
              alt=""
              src="https://images.unsplash.com/photo-1600486913747-55e5470d6f40?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
              class="size-10 rounded-full object-cover"
            />

            <div>
              <p class="text-xs">
                <strong class="block font-medium">{user.name}</strong>

                <span>{user.id}</span>
              </p>
            </div>
          </a>
        </div>
      </div>

      {page === 'upload' && <Upload user={user} />}
      {page === 'Hired' && <Impressions title={"Hired"} user={user} />}
      {page === 'Rejected' && <Impressions title={"Rejected"} user={user} />}
      {page === 'Pending' && <Impressions title={"Pending"} user={user} />}
      {page === 'Cart' && <Cart page={page} title={"Cart"} user={user.id} />}
    </div>
  )
}

const Upload = ({ user }) => {
  const [title, setTitle] = useState('');
  const [experience, setExperience] = useState('');
  const [phone, setPhone] = useState('');
  const [expertise, setExpertise] = useState('');
  const [description, setDescription] = useState('');
  const [images, setImages] = useState([]);
  const[loader,setLoader]= useState(false)
  const handleUpload = async (e) => {
    e.preventDefault();
setLoader(true);

if (!title || !experience || !phone || !description || description.split(' ').length > 100 || !expertise || images.length === 0) {
  setLoader(!loader)
  toast.error('Please fill in all fields and make sure the description is not more than 100 words. Also, upload at least one image.');
  return;
}


    try {
      const imageUrls = [];
      const productId = user.name.replace(/\s+/g, '-').toLowerCase() + '&' + user.id + '&' + Date.now().toString();

      // Upload images to Firebase Storage
      for (const image of images) {
        const imageName = `${productId}-${image.name}`; // Construct unique image name
        const storageRef = ref(storage, `products/${imageName}`);
        const uploadTask = uploadBytes(storageRef, image.file); // Use uploadBytes instead of uploadBytesResumable

        try {
          // Wait for upload to complete
          await uploadTask;

          // Get download URL for the uploaded image
          const imageUrl = await getDownloadURL(storageRef);
          imageUrls.push(imageUrl);
        } catch (error) {
          // Handle upload error
          console.error('Error uploading image:', error);
        }
      }

      // Create a new product entry in the database
      const userProductRef = dbRef(database, `users/${user.id}/products/${productId}`);
      const productRef = dbRef(database, `products/${productId}`);

      await Promise.all([
        set(userProductRef, {
          description,
          experience,
          expertise,
          images: imageUrls,
          phone,
          title,
          productId,
        }),
        set(productRef, {
          description,
          experience,
          expertise,
          images: imageUrls,
          phone,
          title,
          productId,
        })
      ]);

      setLoader(false)
      setTitle('');
      setExperience('');
      setPhone('');
      setExpertise('');
      setDescription('');
      setImages([]);

      toast.success('Product uploaded successfully.');
    } catch (error) {
      toast.error('An error occurred while uploading the product.');
      console.error(error);
    }
  };



  return (<>
{ loader &&<Loader/>}
    <section class="w-4/5 ">
      <div class="w-full flex px-4 py-16 ">

        <ImageGrid images={images} setImages={setImages} />

        <div class="rounded-lg bg-white w-full p-8 shadow-lg l">
          <form action="#" class="space-y-4">
            <div className=' border rounded-lg'>
              <label class="sr-only" for="name">Title</label>
              <input
                onChange={(e) => setTitle(e.target.value)}
                class="w-full rounded-lg border-gray-200 p-3 focus:border-[#B08B59] outline-none text-sm"
                placeholder="Title"
                type="text"
                id="name"
              />
            </div>

            <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className=' border rounded-lg'>
                <label class="sr-only" for="email">Experience</label>
                <input onChange={(e) => setExpertise(e.target.value)}
                  class="w-full rounded-lg border-gray-200 p-3 text-sm outline-none"
                  placeholder="Experience"
                  type=""
                  id="email"
                />
              </div>

              <div className=' border rounded-lg'>
                <label class="sr-only" for="phone">Phone</label>
                <input onChange={(e) => setPhone(e.target.value)}
                  class="w-full rounded-lg border-gray-200 p-3 text-sm outline-none"
                  placeholder="Phone Number"
                  type="tel"
                  id="phone"
                />
              </div>
            </div>
            <div>Expertise</div>
            <div class="grid grid-cols-1 gap-4 text-center sm:grid-cols-3">
              <div>
                <label
                  htmlFor="Beginner"
                  className={`block w-full cursor-pointer rounded-lg border border-gray-200 p-3 text-gray-600 hover:border-[#B08B59] ${experience === 'Beginner' ? 'border-[#B08B59] bg-[#B08B59] text-white' : ''
                    }`}
                >
                  <input
                    type="radio"
                    id="Beginner"
                    name="experience"
                    value="Beginner"
                    className="sr-only"
                    checked={experience === 'Beginner'}
                    onChange={(e) => setExperience(e.target.value)}
                  />
                  <span className="text-sm">Beginner</span>
                </label>
              </div>

              <div>
                <label
                  htmlFor="Intermediate"
                  className={`block w-full cursor-pointer rounded-lg border border-gray-200 p-3 text-gray-600 hover:border-[#B08B59] ${experience === 'Intermediate' ? 'border-[#B08B59] bg-[#B08B59] text-white' : ''
                    }`}
                >
                  <input
                    type="radio"
                    id="Intermediate"
                    name="experience"
                    value="Intermediate"
                    className="sr-only"
                    checked={experience === 'Intermediate'}
                    onChange={(e) => setExperience(e.target.value)}
                  />
                  <span className="text-sm">Intermediate</span>
                </label>
              </div>

              <div>
                <label
                  htmlFor="Advanced"
                  className={`block w-full cursor-pointer rounded-lg border border-gray-200 p-3 text-gray-600 hover:border-black ${experience === 'Advanced' ? 'border-[#B08B59] bg-[#B08B59] text-white' : ''
                    }`}
                >
                  <input
                    type="radio"
                    id="Advanced"
                    name="experience"
                    value="Advanced"
                    className="sr-only"
                    checked={experience === 'Advanced'}
                    onChange={(e) => setExperience(e.target.value)}
                  />
                  <span className="text-sm">Advanced</span>
                </label>
              </div>
            </div>


            <div className=' border rounded-lg'>
              <label class="sr-only" for="message">Description</label>

              <textarea onChange={(e) => setDescription(e.target.value)}
                class="w-full rounded-lg border-gray-200 p-3 outline-none text-sm"
                placeholder="Description"
                rows="8"
                id="message"
              ></textarea>
            </div>

            <div class="mt-4">
              <button onClick={handleUpload}
                type="submit"
                class="inline-block w-full rounded-lg bg-[#B08B59] px-5 py-3 font-medium text-white sm:w-auto"
              >
                Upload
              </button>
            </div>
          </form>

        </div>
      </div>
    </section>
  </>
  )
}


const ImageGrid = ({ images, setImages }) => {


  const onDrop = (acceptedFiles) => {
  

    if (images.length + acceptedFiles.length > 4) {
      // Notify the user that they can only upload up to 4 images
      toast.error('You can only upload up to 4 images.');
      return;
    }
    const newImages = acceptedFiles.map((file) => ({
      id: file.name,
      name: file.name, // Set the name attribute correctly
      url: URL.createObjectURL(file),
      file: file
    }));
    setImages([...images, ...newImages]);
  };


  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  const handleDragEnd = (result) => {
    if (!result.destination) return;

    const newImages = Array.from(images);
    const [reorderedImage] = newImages.splice(result.source.index, 1);
    newImages.splice(result.destination.index, 0, reorderedImage);

    setImages(newImages);
  };

  return (
    <div className=' w-full  border-dashed border-[#B08B59] border-2 mx-2 flex flex-col justify-center items-center rounded-3xl'>
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="images">
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef} className="grid grid-cols-2 gap-8 p-10">
              {images.map((image, index) => (
                <Draggable key={image.id} draggableId={image.id} index={index}>
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      className="relative overflow-hidden w-full h-36"
                    >
                      <img src={image.url} alt={`Image ${index + 1}`} className="object-cover w-full h-full" />
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>

      <div className="mt-4 w-80 h-20 cursor-pointer" {...getRootProps()}>
        <input {...getInputProps()} />
        <p className="text-black text-xl text-center">Drag 'n' drop some files here, or click to select files</p>
      </div>
    </div>
  );
};


const Impressions = (props) => {
  const [data, setData] = useState([]);
  const [user, setUser] = useContext(User);

  useEffect(() => {
    const fetchImpressions = async () => {
      try {
       if(props.title=="Hired"){
        const userImpressionsRef = dbRef(getDatabase(), `users/${user.id}/impressions/hired`);
        const userImpressionsSnapshot = await get(userImpressionsRef);
        const userImpressionsData = userImpressionsSnapshot.val();

        if (userImpressionsData) {
          // Convert impressions data to an array and set the state
          const items = Object.values(userImpressionsData);
          setData(items);
        }
       
       }
       else if(props.title =="Pending"){
        const userImpressionsRef = dbRef(getDatabase(), `users/${user.id}/impressions/pending`);
        const userImpressionsSnapshot = await get(userImpressionsRef);
        const userImpressionsData = userImpressionsSnapshot.val();

        if (userImpressionsData) {
          // Convert impressions data to an array and set the state
          const items = Object.values(userImpressionsData);
          setData(items);
        } 
       }
       else{
        const userImpressionsRef = dbRef(getDatabase(), `users/${user.id}/impressions/rejected`);
        const userImpressionsSnapshot = await get(userImpressionsRef);
        const userImpressionsData = userImpressionsSnapshot.val();

        if (userImpressionsData) {
          // Convert impressions data to an array and set the state
          const items = Object.values(userImpressionsData);
          setData(items);
        }
       }
      } catch (error) {
        console.error('Error fetching impressions:', error);
      }
    };

    // Fetch impressions data when the user ID changes
    if (user.id != null) {
      fetchImpressions();
    }
  }, [user.id]);

  return (
    <>
      <div className='w-4/5 h-screen flex flex-col justify-start items-start p-8'>
        <Table data={data} title={props.title} />
      </div>
    </>
  );
};


const Cart = (props) => {
const[loader,setLoader]= useState(true);
  const [user, setUser] = useContext(User);
  const [pproducts, setpProducts] = useState([]);
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
  const fetchCartProducts = async () => {
      try {
        setLoader(true)
        // Fetch product IDs from the user's cart
        const userCartRef = dbRef(getDatabase(), `users/${user.id}/cart/pending`);
        const userCartSnapshot = await get(userCartRef);
        const userCartData = userCartSnapshot.val();

        if (userCartData) {

          const productIds = Object.keys(userCartData);

          // Fetch products based on the retrieved product IDs
          const productPromises = productIds.map(async productId => {

            const productRef = dbRef(getDatabase(), `products/${productId}`);
            get(productRef)
              .then((snapshot) => {
                const productData = snapshot.val();

                if (productData) {
                  setpProducts(prevProducts => [...prevProducts, productData]);
                }

              })
              .catch((error) => {
                console.error('Error fetching user profile data:', error.message);
              });

          });

        }
      } catch (error) {
        console.error('Error fetching cart products:', error);
      }
    };
    if (user.id != null) {

      fetchCartProducts();
      setLoader(false)
    }

  }, [user.id]);


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

    <>
    {loader && <Loader/>}
      <div className='w-4/5 h-screen flex flex-col justify-start items-start p-8'>
        <h1 className=' text-2xl font-semibold'>→ {props.title}  </h1>


        <div className='flex flex-wrap space-x-5'>
          {/* Map through the array and render a ThreeDCardDemo component inside each div */}
  {pproducts
    ?.filter((product, index, self) =>
      index === self.findIndex((p) => p.productId === product.productId)
    )
    .map((card, index) => (
      <div key={index} className="card">
        {/* Pass appropriate props to ThreeDCardDemo */}
        <ThreeDCardDemo
          heading={truncatetitle(card.title)}
          des={truncateDescription(card.description)}
          src={card.images[0]}
          id={card.productId}
        />
      </div>
    ))}

        </div>
      </div>
    </>
  )
}

const Table =(props)=>{

const data = props.data

console.log(data)
  return (
    <div className="w-full  px-4 md:px-8">
        <div className="items-start justify-between md:flex">
            <div className="max-w-lg">
                <h3 className="text-gray-800 text-xl font-bold sm:text-2xl">
                    {props.title} Designs
                </h3>
                <p className="text-gray-600 mt-2">
                    These all the Buyers who are intrested in your Arts.
                </p>
            </div>
           
        </div>
        <div className="mt-12 shadow-sm border rounded-lg overflow-x-auto">
            <table className="w-full table-auto text-sm text-left">
                <thead className="bg-[#B08B59] text-white font-medium border-b">
                    <tr>
                        <th className="py-3 px-6">Username</th>
                        <th className="py-3 px-6">Email</th>
                        <th className="py-3 px-6">Phone</th>
                        <th className="py-3 px-6"></th>
                        <th className="py-3 px-6"></th>

                    </tr>
                </thead>
                <tbody className="text-gray-600 divide-y ">
                    {
                        data.map((item, idx) => (
                            <tr key={idx}>
                                <td className="flex items-center gap-x-3 py-3 px-6 whitespace-nowrap">
                                    
                                    <div>
                                        <span className="block text-gray-700 text-sm font-medium">{item.name}</span>
                                        <span className="block text-gray-700 text-xs">{item.userID}</span>
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">{item.email}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{item.phone}</td>
                              
                                <td className="text-right px-6 whitespace-nowrap">
                                   
                                <Link to={`/products/${item.productID}`} > <button className="py-3 my-2 leading-none px-6 font-medium text-[#B08B59] hover:text-white duration-150 hover:bg-[#B08B59] rounded-lg">
                                        View Design
                                    </button></Link>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    </div>
)

}