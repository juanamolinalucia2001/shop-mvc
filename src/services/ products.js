//peticiones a la Api

import axios from "axios";
import products from "@/Models/products";

class service{
    getAllProducts() {
        const url = 'https://fakestoreapi.com/products'
        
           return axios
             .get(`${url}`)
             .then(({ data }) => {
               return data.map((item) => {
                 return products.fromJson(item);
               });
             });
         }
}

export default service;

