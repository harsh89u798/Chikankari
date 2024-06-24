import React from "react";
import { CardBody, CardContainer, CardItem } from "./Card_";
import { Link } from "react-router-dom";

function ThreeDCardDemo(props) {
  return (
    <CardContainer className="inter-var">
      <CardBody className="bg-[#B08B59] relative group/card  dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1]  h-auto rounded-xl p-6 border  ">
        <CardItem
          translateZ="50"
          className="text-xl font-bold text-white dark:text-white"
        >
          {props.heading}
        </CardItem>
        <CardItem
          as="p"
          translateZ="60"
          className="text-white text-sm max-w-sm mt-2 dark:text-neutral-300"
        >
          {props.des}
        </CardItem>
        <CardItem translateZ="100" className="w-full mt-4">
          <img
            src={props.src}
            height="1000"
            width="1000"
            className="h-60 w-full object-cover rounded-xl group-hover/card:shadow-xl"
            alt="thumbnail"
          />
        </CardItem>
        <div className="flex justify-between items-center mt-5">
        <Link to={`/products/${props.id}`} ><CardItem
            translateZ={20}
           
            target="__blank"
            className="px-4 py-2 rounded-xl text-lg font-medium cursor-pointer text-white hover:bg-[#c29e70] dark:text-white"
          >
            Buy now 
          </CardItem></Link> 

          <CardItem
            translateZ={20}
            as="button"
            className="px-4 py-2 rounded-xl text-white text-3xl font-bold"
          >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 ml-1 duration-150" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
          </CardItem>
        </div>
      </CardBody>
    </CardContainer>
  );
}

export default ThreeDCardDemo;
