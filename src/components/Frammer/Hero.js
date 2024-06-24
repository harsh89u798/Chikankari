import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const ShuffleHero = () => {
  return (
    <section className="w-full px-8 py-48 grid grid-cols-1 z-0 md:grid-cols-2 items-center gap-8 max-w-6xl mx-auto">
      <div>
        <h3 className="text-4xl md:text-6xl text-[#FED766] font-semibold">
        Lucknow Elegance, A Digital Tapestry of Chikankari Artistry
        </h3>
        <p className="text-base md:text-lg text-slate-700 my-4 md:my-6">
        Embark on a journey through the timeless elegance of Lucknow's Chikankari artistry.
        </p>
        <button className="bg-[#B08B59] text-white font-medium py-2 px-4 rounded transition-all hover:bg-[#876941] active:scale-95">
          Explore
        </button>
      </div>
      <ShuffleGrid />
    </section>
  );
};

const shuffle = (array) => {
  let currentIndex = array.length,
    randomIndex;

  while (currentIndex != 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
};

const squareData = [
  {
    id: 1,
    src: "https://www.unnatisilks.com/cdn/shop/articles/main-image-11.jpg?v=1655293910&width=2048",
  },
  {
    id: 2,
    src: "https://i.pinimg.com/736x/84/6e/63/846e6321c2fdc93f45c03476bf6f002f.jpg",
  },
  {
    id: 3,
    src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQy2hkEI2q5vUEwaNWN2ufy1FJJV38nOqWaE-IUMvxMUg&s",
  },
  {
    id: 4,
    src: "https://i0.wp.com/www.gitagged.com/wp-content/uploads/2020/01/Chikankari-Hand-Embroidered-Pink-Floral-Design-Cotton-Dress-Material-Set-2.jpg?fit=700%2C700&ssl=1",
  },
  {
    id: 5,
    src: "https://jhakhas.com/cdn/shop/articles/the-forgotten-art-of-chikankari.jpg?v=1631812656&width=2048",
  },
  {
    id: 6,
    src: "https://ayurvastram.wordpress.com/wp-content/uploads/2016/02/chikan2-v.jpg",
  },
  {
    id: 7,
    src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRXCVO5rpxktaPCMof6j_4k2_4S9Odew9UChaCiRVSK&s",
  },
  {
    id: 8,
    src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRmxQwmgkyqT3hMkDNnnPPV9aaZVgcl_P5P7QmgZy-f2A&s",
  },
  {
    id: 9,
    src: "https://theindiancouture.com/cdn/shop/articles/fyrjdrtdr_chikankari_embroidery_a2154a27-907a-407b-84aa-2ad25d567f86.png?v=1675872939",
  },
  {
    id: 10,
    src: "https://frangipani.co.in/cdn/shop/articles/67b5a6182f129993d910eb718c9bc22c.jpg?v=1647924839",
  },
  {
    id: 11,
    src: "https://dhaaramagazine.in/wp-content/uploads/2022/12/0_sulQ2CevabyX08K2.jpg",
  },
  {
    id: 12,
    src: "https://injiri.co.in/wp-content/uploads/2019/04/2.jpg",
  },
 
];

const generateSquares = () => {
  return shuffle(squareData).map((sq) => (
    <motion.div
      key={sq.id}
      layout
      transition={{ duration: 1.5, type: "spring" }}
      className="w-full h-full z-0"
      style={{
        backgroundImage: `url(${sq.src})`,
        backgroundSize: "cover",
      }}
    ></motion.div>
  ));
};

const ShuffleGrid = () => {
  const timeoutRef = useRef(null);
  const [squares, setSquares] = useState(generateSquares());

  useEffect(() => {
    shuffleSquares();

    return () => clearTimeout(timeoutRef.current);
  }, []);

  const shuffleSquares = () => {
    setSquares(generateSquares());

    timeoutRef.current = setTimeout(shuffleSquares, 1000);
  };

  return (
    <div className="grid grid-cols-4 grid-rows-3 h-[450px] z-0 gap-1">
      {squares.map((sq) => sq)}
    </div>
  );
};

export default ShuffleHero;