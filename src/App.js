import './App.css';
import React from 'react';
import { TfiReload } from "react-icons/tfi";
import { IoMoonOutline } from "react-icons/io5";
import { FiSun } from "react-icons/fi";
import bg from "./Images/bg.png"
import { useEffect, useState } from 'react';

import FormPart from './Component/FormPart';

function App() {

  const [color , setColor] = useState(true);
  const [currentDate, setCurrentDate] = useState(null);
  const [currentTime, setCurrentTime] = useState(null);

  useEffect(() => {
    const intervalId = setInterval(() => {
       const date = new Date();
       const dateString =  date.toLocaleDateString('en-US', { hour12: true })
       setCurrentDate(dateString);
       const timeString =  date.toLocaleTimeString('en-US', { hour12: true })
       const timeWithoutSeconds = timeString.replace(/:\d+ /, ' ');
       setCurrentTime(timeWithoutSeconds);
       
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);


  const HnadleMode = (color) => {
    setColor(color);
  }

  return (
    <div className={`App bgImage w-screen h-screen flex justify-center ${color === false ? "bg-richblack-900" : "bg-richblack-25"}`}>
      <div className={`flex w-[50%] h-auto rounded-md p-6 ${color === false ? "bg-richblack-800" : "bg-richblack-800"} flex-col gap-6 mt-24 mb-24`}>
        <div className='flex gap-3 h-[20%] w-full justify-between items-center px-4'>
          <div>
            <div className='text-white flex flex-col gap-3'>
              <h1 className='text-2xl text-richblack-25 font-semibold leading-7 space-x-3'>Currency Converter:</h1>
              <p className='text-richblack-200'>Today: {currentTime} | {currentDate}</p>
            </div>
          </div>
          <div className='text-white flex gap-8 justify-end rounded-3xl bg-richblack-50 '>
            {
              color === false ? (
                <button onClick={() => HnadleMode(true)} className='p-2 bg-gray-100 text-richblack-900 rounded-full cursor-pointer'>
                  <IoMoonOutline className='text-xl' />
                </button>
              ) : (
                <button onClick={() => HnadleMode(false)} className='p-2 bg-slate-100 text-richblack-900 rounded-full cursor-pointer'>
                  <FiSun className='text-xl' />
                </button>
              )
            }
          </div>
        </div>
        <FormPart />
      </div>
    </div>
  );
  
}

export default App;
