import axios from "axios";
import toast from "react-hot-toast";
import { currencyConvaterEndpoints } from "./apis";

const { Currencies_API } = currencyConvaterEndpoints;





export function getAllAvailableCurrency() {

    const options_currency = {
        method: 'GET',
        url: Currencies_API,
        params: {output: 'JSON'},
        headers: {
          'X-RapidAPI-Key': 'ea7c82332emshd4b6fc15d1a22d0p1c7ba8jsnbd73739d3129',
          'X-RapidAPI-Host': 'currencyapi-net.p.rapidapi.com'
        }
    };
    
    return new Promise((resolve, reject) => {
        const toastId = toast.loading("Loading...");
        axios.request(options_currency)
            .then(response => {
                if (response.data) {
                    resolve(response.data);
                } else {
                    reject(new Error("No data received from AvailableCurrencies_API"));
                }
            })
            .catch(error => {
                reject(error);
            });
        toast.dismiss(toastId);
    });

    
}



export const  convartCurrency = async (data) => {

    console.log(data.FromCurrency , data.ToCurrency);
    const toastId = toast.loading("Loading...");
    let result = null;
    const options = {
        method: 'GET',
        url: 'https://forex-convertor.p.rapidapi.com/getExchangeRate',
        params: {
          from: data.FromCurrency,
          to: data.ToCurrency,
        },
        headers: {
          'X-RapidAPI-Key': 'ea7c82332emshd4b6fc15d1a22d0p1c7ba8jsnbd73739d3129',
          'X-RapidAPI-Host': 'forex-convertor.p.rapidapi.com'
        }
    };

    try {
        const response = await axios.request(options);
        console.log(response.data);
        result = response.data;
    } catch (error) {
        console.error(error);
        toast.error(error);
    }
    toast.dismiss(toastId);
    return result;

   
    
}
