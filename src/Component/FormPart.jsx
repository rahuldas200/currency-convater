import React from 'react'
import {getAllAvailableCurrency} from '../apis/apiCalles'
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import {useForm} from 'react-hook-form'
import { FaExchangeAlt } from "react-icons/fa";
import {convartCurrency} from '../apis/apiCalles'

const FormPart = () => {

    const [currencies , setCurrencies] = useState({});
    const [calculateAmount , setCalculateAmount] = useState();
    const [fromCurrncy, setFormCurrency] = useState(null);

    const {
        register,
        handleSubmit,
        setValues,
        getValues,
        formState : {errors},
    } = useForm();


    useEffect( () => {
        getAllAvailableCurrency()
        .then(data => {
            console.log("Available currencies:", data);
            setCurrencies(data?.currencies || {} );
        })
        .catch(error => {
            console.error("Error fetching available currencies:", error);
            toast.error("Error fetching available currencies");

        });
        
    },[])

    const onsubmit = async () => {
        const formData = getValues();
        console.log(formData);
        const result = await convartCurrency(formData);
        console.log(result);
        
        let TotalAmount = result.exchangeRate * formData.amount;
        setCalculateAmount(TotalAmount);
    }



    return (
        <form className='w-full h-auto p-6 flex flex-col gap-10' onSubmit={handleSubmit(onsubmit)}>
          <div className='flex justify-between flex-auto'>

            <div className='flex flex-col gap-6'>

              <div className='flex flex-col gap-3'>
                <label className='text-xl text-richblack-25'>From</label>
                <select id='FromCurrency' 
                    defaultValue={"INR"} 
                    {...register("FromCurrency", { required: true })} 
                    className='w-full bg-richblack-800 rounded-[0.5rem] border-b-[2px] border-b-richblack-50 text-richblack-5 p-3 appearance-none'>
                  <option className='ring-richblack-5'>----Currency----</option>
                  { 
                    Object.keys(currencies).map(currencyCode => (
                    <option className='text-richblack-25'value={currencyCode} key={currencyCode}>{currencyCode} - {currencies[currencyCode]}</option>
                    ))
                  }
                </select>
              </div>

              <div className='flex flex-col gap-3'>
                <label htmlFor="" className='text-xl text-richblack-25'>Enter {fromCurrncy} Amount</label>
                <input type="number" 
                    id='amount' 
                    {...register("amount", { required: true })} 
                    placeholder='Please Enter your amount' 
                    className='w-full bg-richblack-800 border-b-[2px] border-b-richblack-50 text-richblack-5 p-3  rounded-md appearance-none'
                />
              </div>

            </div>
            <div className='px-12'>
                <FaExchangeAlt className='text-2xl text-richblack-25 mt-28'/>
            </div>

            <div className='flex flex-col gap-6'>

              <div className='flex flex-col gap-3'>
                <label className='text-2xl text-richblack-25' htmlFor="FromCurrency">To</label>
                <select 
                    id='ToCurrency' 
                    defaultValue={"INR"} 
                    {...register("ToCurrency", { required: true })} 
                    className='w-full bg-richblack-800 border-b-[2px] border-b-richblack-50 text-richblack-5 p-3  rounded-md'>
                    <option>----Currency----</option>
                        {
                            Object.keys(currencies).map(currencyCode => (
                            <option value={currencyCode} key={currencyCode}>{currencyCode} - {currencies[currencyCode]}</option>
                    ))}
                </select>
              </div>

              <div className='flex flex-col gap-3'>
                <label htmlFor="" className='text-xl text-richblack-25'>Calculated amount</label>
                <p  
                    className='w-full bg-richblack-800 border-b-[2px] border-b-richblack-50 text-richblack-5 p-3  rounded-md'
                >{calculateAmount}</p>
              </div>
            </div>

          </div>
          <div className='flex justify-center'>
            <button type='submit' className='bg-blue-500 text-white px-4 py-2 rounded-md mt-4'>Calculate</button>
          </div>
        </form>
      );
      
}

export default FormPart
